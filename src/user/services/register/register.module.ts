import { Module } from '@nestjs/common'
import { RegisterService } from './register.service'
import { RegisterController } from './register.controller'
import { UserDBModule } from '@/databases/user/userDB.module'

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [UserDBModule],
})
export class RegisterModule {}
