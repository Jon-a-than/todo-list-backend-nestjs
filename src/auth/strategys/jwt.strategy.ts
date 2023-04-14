import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { JWT_SECRET } from '../constants/sectet'
import type { IUserDB } from '@/user/interfaces/user.interface'

const getBearerToken: JwtFromRequestFunction = function (req) {
  /** @desc 对Socket请求添加header */
  if (!req.headers) {
    const context = req as unknown as ExecutionContext
    const BearerToken = context['handshake'].auth.authorization
    req.headers = { authorization: BearerToken }
  }

  return ExtractJwt.fromAuthHeaderAsBearerToken()(req)
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      WebSocket: true,
      jwtFromRequest: getBearerToken,
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    })
  }

  /**
   * @returns JWT payload, @Request.user = userOmittedInfo
   * @info 调用此方法时，已经通过 JWT 签名验证
   */
  async validate(
    userInfo: IUserDB & { iat: number; exp: number; __v: number },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, exp, _id, __v, ...userOmittedInfo } = userInfo
    return userOmittedInfo
  }
}
