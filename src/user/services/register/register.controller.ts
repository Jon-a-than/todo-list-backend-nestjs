import { Body, Controller, Post, Get, Param } from '@nestjs/common'
import { RegisterService } from './register.service'
import type { IRegisterDTO } from '../../interfaces/user.interface'

@Controller('user/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() { user, pwd1, pwd2, phone, code }: IRegisterDTO) {
    return await this.registerService.register(user, pwd1, pwd2, phone, code)
  }

  @Get('/:phone')
  async sendCode(@Param('phone') phone: string) {
    return await this.registerService.sendCode(phone)
  }
}
