import { Module } from '@nestjs/common'
import { InfoService } from './info.service'
import { InfoController } from './info.controller'
import { UserDBModule } from '@/databases/user/userDB.module'

@Module({
  controllers: [InfoController],
  providers: [InfoService],
  imports: [UserDBModule],
})
export class InfoModule {}
