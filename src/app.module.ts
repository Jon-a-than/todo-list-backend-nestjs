import { Module } from '@nestjs/common'
// import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TodoModule } from './todo/todo.module'

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/todoList'),
    UserModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
