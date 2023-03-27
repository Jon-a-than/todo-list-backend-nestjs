import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { UserDBInfo } from '../types/user.type'

@Injectable()
export class UserDBService {
  constructor(@InjectConnection() private connection: Connection) {}

  async findOne(fillter: object): Promise<UserDBInfo | null> {
    return (await this.connection
      .collection('user')
      .findOne(fillter)) as unknown as UserDBInfo | null
  }

  async insertOne(data: object): Promise<boolean> {
    const { acknowledged } = await this.connection
      .collection('user')
      .insertOne(data)

    return acknowledged
  }
}
