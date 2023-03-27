import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { RegisterModule } from './register/register.module'
import { AuthModule } from '@/auth/auth.module'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule, RegisterModule],
})
export class UserModule {}
