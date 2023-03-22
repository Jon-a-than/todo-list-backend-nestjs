import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import type { UserInfo } from './types/user.type'

@Injectable()
export class UserService {
  constructor(@InjectConnection() private connection: Connection) {}

  async findOne(user: string): Promise<UserInfo | null> {
    return (await this.connection.collection('user').findOne({
      $or: [{ user }, { phone: user }],
    })) as unknown as UserInfo | null
  }
}
