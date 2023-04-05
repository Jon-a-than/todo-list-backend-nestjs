import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import type { IUserDB } from '@/user/interfaces/user.interface'

@Injectable()
export class UserDBService {
  constructor(@InjectConnection() private connection: Connection) {}

  async findOne(filter: object): Promise<IUserDB | null> {
    return (await this.connection
      .collection('user')
      .findOne(filter)) as unknown as IUserDB | null
  }

  async insertOne(data: object): Promise<boolean> {
    const { acknowledged } = await this.connection
      .collection('user')
      .insertOne(data)

    return acknowledged
  }
}
