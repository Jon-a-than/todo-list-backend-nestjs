import { Module } from '@nestjs/common'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
import { AuthModule } from '@/auth/auth.module'

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [AuthModule],
})
export class LoginModule {}
