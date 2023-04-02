import {
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Controller,
  ParseUUIDPipe,
} from '@nestjs/common'
import { LoginService } from './login.service'
import { AuthService } from '@/auth/auth.service'
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util'
import type { IUserDB } from '@/user/interfaces/user.interface'

@Controller('user')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() { user }: { user: Omit<IUserDB, 'pwd'> }) {
    return this.authService.login(user)
  }

  @Get('/:uuid')
  async refreshVerifyCode(
    @Param(
      'uuid',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new HttpErrorByCode[400]('uuid参数错误'),
      }),
    )
    uuid: string,
  ) {
    return await this.loginService.refreshVerifyCode(uuid)
  }
}
