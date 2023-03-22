import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import * as env from 'dotenv'
env.config({ path: '.secret.env' })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(4000)
}

bootstrap()
