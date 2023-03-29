import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { UserDBService } from '@/user/userDB/userDB.service'
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pwd, ...result } = userInfo
      return result
    }
    return null
  }

  async login(userInfo: Omit<IUserDB, 'pwd'>) {
    // JWT payload @Request.user = payload
    const payload = userInfo
    return { access_token: this.jwtService.sign(payload) }
  }
}
