import { AppService } from '@/app.service'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common'

import type { UserDBInfo } from '@/user/types/user.type'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() { user }: { user: Omit<UserDBInfo, 'pwd'> }) {
    return this.authService.login(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() { user }: { user: Omit<UserDBInfo, 'pwd' | '_id'> }) {
    return user
  }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
