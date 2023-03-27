import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { RegisterModule } from './register/register.module'
import { AuthModule } from '@/auth/auth.module'

@Module({
  controllers: [UserController],
  imports: [AuthModule, RegisterModule],
})
export class UserModule {}
