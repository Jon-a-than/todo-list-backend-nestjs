import { Module } from '@nestjs/common'
import { RegisterService } from './register.service'
import { RegisterController } from './register.controller'

import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, User } from '../schemas/user.schema'

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class RegisterModule {}
