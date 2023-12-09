import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { MailModule } from './mail/mail.module'
import { LoggerModule } from './logger/logger.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [process.env.NODE_ENV === 'prod' ? 'env/.env.prod' : 'env/.env.dev', 'env/.env']
    }),
    LoggerModule,
    MailModule
  ]
})
export class AppModule {}
