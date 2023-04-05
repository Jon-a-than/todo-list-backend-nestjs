import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from '../auth.service'
import { redis } from '@/utils/redis'
import { getSvgCaptcha } from '@/utils/svgCaptcha'
import { getUuid } from '@/utils/uuid'

import type {
  ValidateFunction,
  VerifyFunctionWithRequest,
} from '../interfaces/local.strategy.interface'

const verifyFunctionWithRequest: VerifyFunctionWithRequest = async function (
  { body },
  user,
  pwd,
  done,
) {
  const { verifyCode, uuid } = body
  const { error, userInfo } = await this.validate({
    user,
    pwd,
    verifyCode,
    uuid,
  })
  return done(error, userInfo)
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      {
        usernameField: 'user',
        passwordField: 'pwd',
        passReqToCallback: true,
      },
      verifyFunctionWithRequest,
    )
  }

  validate: ValidateFunction = async ({ user, pwd, verifyCode, uuid }) => {
    const verifyError = await this.validateVerifyCode(user, uuid, verifyCode)
    if (verifyError) return { error: verifyError }

    const userInfo = await this.authService.validateUser(user, pwd)
    if (!userInfo) {
      const newUUID = getUuid()
      const { verifyCodeSvg, error } = await getSvgCaptcha(newUUID, true)
      this.setUserUUID(user, newUUID)
      return {
        error: error
          ? error
          : new UnauthorizedException({
              verifyCodeSvg,
              uuid: newUUID,
              message: '用户名或密码错误',
            }),
      }
    }
    redis.del(`verifyCode:${user}`, uuid)
    return { userInfo }
  }

  async validateVerifyCode(user: string, uuid?: string, verifyCode?: string) {
    const [userUUID, count] = (await redis.get(`verifyCode:${user}`))?.split(
      '$',
    ) ?? [null, '0']

    switch (true) {
      case uuid && !verifyCode:
        return new HttpException('验证码参数缺失', 418)
      case +count >= 5:
        return new HttpException('验证错误次数过多', 429)
      case !uuid && !userUUID:
        return null
      case userUUID === uuid || !userUUID:
        const uuidVerifyCode = (await redis.get(uuid))?.slice(0, 4) ?? null
        if (verifyCode === uuidVerifyCode) return null
    }

    const newUUID = userUUID ?? uuid
    const { verifyCodeSvg } = await getSvgCaptcha(newUUID, true)
    this.setUserUUID(user, newUUID, +count + 1)
    return new HttpException(
      {
        verifyCodeSvg,
        uuid: newUUID,
        message: uuid ? '验证码错误' : '请填写验证码',
      },
      400,
    )
    /**
     * uuid !== userUUID ================> newUUID = userUUID ?? uuid 生成验证码
     * verifyCode !== uuidVerifyCode =====> newUUID = userUUID ?? uuid 生成验证码
     * ！uuid && userUUID ===============> newUUID = userUUID ?? uuid 生成验证码
     */
  }

  setUserUUID(user: string, uuid: string, count = 0) {
    redis.set(`verifyCode:${user}`, uuid + '$' + count, 'EX', 300)
  }
}
