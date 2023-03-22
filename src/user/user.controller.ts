import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async login(@Body() { user }: { user: string }) {
    return this.userService.findOne(user)
  }
}
