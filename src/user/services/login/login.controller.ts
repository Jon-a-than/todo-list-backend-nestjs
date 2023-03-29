import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { LoginService } from './login.service'
import { AuthService } from '@/auth/auth.service'
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard'
import type { IUserDB } from '@/user/interfaces/user.interface'

@Controller('user/login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() { user }: { user: Omit<IUserDB, 'pwd'> }) {
    return this.authService.login(user)
  }
}
