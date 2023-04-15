import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { UserModule } from '@/user/user.module'
import { TodoModule } from '@/todo/todo.module'
import { AuthModule } from '@/auth/auth.module'
import { WebSocketsModule } from '@/webSockets/webSockets.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST ?? '127.0.0.1'}:27017`,
      { dbName: 'todoList' },
    ),
    UserModule,
    TodoModule,
    AuthModule,
    WebSocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
