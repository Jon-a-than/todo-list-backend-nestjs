import { Request, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard'
import { UserDBInfo } from './types/user.type'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }: { user: Omit<UserDBInfo, 'pwd'> }) {
    return this.authService.login(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() { user }: { user: Omit<UserDBInfo, 'pwd' | '_id'> }) {
    return user
  }
}
