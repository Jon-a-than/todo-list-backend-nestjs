import { Body, Controller, Post, Get, Param } from '@nestjs/common'
import type { RegisterInfo } from '../types/user.type'
import { RegisterService } from './register.service'

@Controller('user/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() { user, pwd1, pwd2, phone, code }: RegisterInfo) {
    return await this.registerService.register(user, pwd1, pwd2, phone, code)
  }

  @Get('/:phone')
  sendCode(@Param('phone') phone: string) {
    return this.registerService.sendCode(phone)
  }
}
