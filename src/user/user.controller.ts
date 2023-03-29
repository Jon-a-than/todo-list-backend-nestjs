import { Request, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import type { IUserDB } from './interfaces/user.interface'

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }: { user: Omit<IUserDB, 'pwd'> }) {
    return this.authService.login(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() { user }: { user: Omit<IUserDB, 'pwd' | '_id'> }) {
    return user
  }
}
