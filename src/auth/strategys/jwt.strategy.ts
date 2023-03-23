import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { JWT_SECRET } from '../constants/sectet'
import { UserDBInfo } from '@/user/types/user.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    })
  }

  /**
   * @returns JWT payload, @Request.user = userOmitedInfo
   * @info 调用此方法时，已经通过 JWT 签名验证
   */
  async validate(userInfo: UserDBInfo & { iat: number; exp: number }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, exp, _id, ...userOmitedInfo } = userInfo
    return userOmitedInfo
  }
}
