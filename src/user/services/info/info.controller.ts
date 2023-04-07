import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common'
import { InfoService } from './info.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { IUserDB } from '@/user/interfaces/user.interface'

@Controller('user')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() { user }: { user: Omit<IUserDB, 'pwd' | '_id'> }) {
    return user
  }

  @UseGuards(JwtAuthGuard)
  @Get('/info')
  async getUserInfo(@Query('prefix') prefix?: string) {
    return await this.infoService.getUserInfo(prefix)
  }
}
