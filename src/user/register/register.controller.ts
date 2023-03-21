import { Body, Controller, Post } from '@nestjs/common'
import type { RegisterInfo } from '../types/user.type'
import { RegisterService } from './register.service'

@Controller('user/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() { user, code }: RegisterInfo) {
    return this.registerService.register(user, code)
  }

  @Post('code')
  sendCode(@Body() { phone }: { phone: string }) {
    return this.registerService.sendCode(phone)
  }
}
