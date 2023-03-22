import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'user', passwordField: 'pwd' })
  }

  async validate(user: string, pwd: string): Promise<any> {
    const userInfo = await this.authService.validateUser(user, pwd)
    if (!userInfo) {
      throw new UnauthorizedException()
    }
    return userInfo
  }
}
