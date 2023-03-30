import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import * as env from 'dotenv'
import { ValidationPipe } from '@nestjs/common'
env.config({ path: '.secret.env' })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(4936)
}

bootstrap()
