import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '@/databases/schemas/user.schema'

import type { IUser } from '@/databases/schemas/user.schema'
import { filterDocument } from '@/databases/tools/filterDocument'

@Injectable()
export class UserDBService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(filter: object) {
    return await this.userModel.findOne(filter).lean().exec()
  }

  async getUserInfo(prefix: string): Promise<{ uid: string; user: string }[]> {
    return (
      await this.userModel
        .find({ user: { $regex: new RegExp(`^${prefix}`, 'i') } })
        .limit(5)
        .lean()
        .exec()
    ).map(({ uid, user }) => ({ uid, user }))
  }

  async insertOne(data: object): Promise<boolean> {
    const newUser = new this.userModel(data)
    return !!(await newUser.save())
  }
}
