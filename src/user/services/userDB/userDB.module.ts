import { Module } from '@nestjs/common'
import { UserDBService } from './userDB.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, User } from '../../schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserDBService],
  exports: [UserDBService],
})
export class UserDBModule {}
