import { Request, Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

import type { IUserDB } from './interfaces/user.interface'

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() { user }: { user: Omit<IUserDB, 'pwd' | '_id'> }) {
    return user
  }
}
