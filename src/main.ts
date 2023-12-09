import chalk from 'chalk'
import { AppModule } from '@/app.module'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { LoggerService } from './logger/logger.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  const configService = app.get(ConfigService<Env>)
  const loggerService = app.get(LoggerService)

  const logLevels = configService.get('LOG_LEVELS')
  loggerService.setLogLevels(logLevels.split(','))

  app.useLogger(loggerService)
  app.enableCors({ origin: configService.get('CORS_ORIGIN') })
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(configService.get('PORT'), configService.get('HOST'))

  const listenUrl = await app.getUrl()
  loggerService.log(`Server listening on ${chalk.bold.blue(listenUrl)}`, 'NestApplication')
}

bootstrap()
