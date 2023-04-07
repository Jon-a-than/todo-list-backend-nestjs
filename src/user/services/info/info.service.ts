import { Injectable } from '@nestjs/common'
import { UserDBService } from '@/databases/user/userDB.service'

@Injectable()
export class InfoService {
  constructor(protected readonly userDBService: UserDBService) {}
  async getUserInfo(prefix?: string) {
    if (!prefix) return { list: [] }
    return { list: await this.userDBService.getUserInfo(prefix) }
  }
}
