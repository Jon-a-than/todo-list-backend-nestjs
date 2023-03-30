import {
  Body,
  Post,
  Get,
  Param,
  Controller,
  ValidationPipe,
} from '@nestjs/common'
import { RegisterService } from './register.service'
import { CreatePhoneDto, CreateRegisterDto } from '@/user/dtos/register.dto'

@Controller('user/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() { user, pwd1, phone, code }: CreateRegisterDto) {
    return await this.registerService.register(user, pwd1, phone, code)
  }

  @Get('/:phone')
  async sendCode(@Param(new ValidationPipe()) { phone }: CreatePhoneDto) {
    return await this.registerService.sendCode(phone)
  }
}
