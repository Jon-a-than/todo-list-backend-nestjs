import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { UserDBService } from '@/databases/user/userDB.service'
import { validatePassword } from '@/utils/hashVerify'

import type { ValidateUser, Login } from '@/auth/interfaces/auth.interface'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userDBService: UserDBService,
  ) {}

  validateUser: ValidateUser = async (user, pwd) => {
    const userInfo = await this.userDBService.findOne({
      $or: [{ user }, { phone: user }],
    })
    if (userInfo && validatePassword(pwd, userInfo.pwd)) {
      const { pwd: _pwd, ...result } = userInfo
      return result
    }
    return null
  }

  login: Login = (userInfo) => {
    return { access_token: this.jwtService.sign(userInfo) }
  }
}
