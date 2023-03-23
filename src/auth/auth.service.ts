import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { UserService } from '@/user/user.service'
import { validatePassword } from '@/utils/hashVerify'

import type { UserDBInfo, UserInfo } from '@/user/types/user.type'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(
    user: string,
    pwd: string,
  ): Promise<Omit<UserInfo, 'pwd'> | null> {
    const userInfo = await this.userService.findOne(user)
    if (userInfo && validatePassword(pwd, userInfo.pwd)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pwd, ...result } = userInfo
      return result
    }
    return null
  }

  async login(userInfo: Omit<UserDBInfo, 'pwd'>) {
    // JWT payload @Request.user = payload
    const payload = { user: userInfo.user, phone: userInfo.phone }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
