import { Strategy, VerifyFunctionWithRequest } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from '../auth.service'
import { IUser } from '@/user/interfaces/user.interface'
import { redis } from '@/utils/redis'
import { getSvgCaptcha } from '@/utils/svgCaptcha'
import { getUuid } from '@/utils/uuid'

const verifyFunctionWithRequest: VerifyFunctionWithRequest = async function (
  this: LocalStrategy,
  { body },
  user: string,
  pwd: string,
  done: (
    error: any,
    user?: Omit<IUser, 'pwd'> | { verifyCodeSvg: string },
  ) => void,
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

  async validate({
    user,
    pwd,
    verifyCode,
    uuid,
  }: {
    user: string
    pwd: string
    verifyCode?: string
    uuid?: string
  }): Promise<{
    error?: unknown
    userInfo?: Omit<IUser, 'pwd'>
  }> {
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
        console.log(uuidVerifyCode, verifyCode)
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
     * veifycode !== uuidVerifyCode =====> newUUID = userUUID ?? uuid 生成验证码
     * ！uuid && userUUID ===============> newUUID = userUUID ?? uuid 生成验证码
     */
  }

  setUserUUID(user: string, uuid: string, count = 0) {
    redis.set(`verifyCode:${user}`, uuid + '$' + count, 'EX', 300)
  }
}
