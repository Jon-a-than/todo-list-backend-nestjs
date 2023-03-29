import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { RegisterModule } from './services/register/register.module'
import { LoginModule } from './services/login/login.module'

@Module({
  controllers: [UserController],
  imports: [RegisterModule, LoginModule],
})
export class UserModule {}
