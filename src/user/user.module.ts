import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { RegisterModule } from './register/register.module'

import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, User } from './schemas/user.schema'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    RegisterModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService],
})
export class UserModule {}
