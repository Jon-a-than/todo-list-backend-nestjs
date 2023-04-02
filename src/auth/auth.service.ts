import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { UserDBService } from '@/user/services/userDB/userDB.service'
import { validatePassword } from '@/utils/hashVerify'

import type { IUser, IUserDB } from '@/user/interfaces/user.interface'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userDBService: UserDBService,
  ) {}

  async validateUser(
    user: string,
    pwd: string,
  ): Promise<Omit<IUser, 'pwd'> | null> {
    const userInfo = await this.userDBService.findOne({
      $or: [{ user }, { phone: user }],
    })
    if (userInfo && validatePassword(pwd, userInfo.pwd)) {
      const { pwd: _pwd, ...result } = userInfo
      return result
    }
    return null
  }

  login(userInfo: Omit<IUserDB, 'pwd'>) {
    const payload = userInfo
    return { access_token: this.jwtService.sign(payload) }
  }
}
