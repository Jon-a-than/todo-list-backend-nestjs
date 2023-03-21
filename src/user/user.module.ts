import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { LoginModule } from './login/login.module'
import { RegisterModule } from './register/register.module'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [LoginModule, RegisterModule],
})
export class UserModule {}
