import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { UserModule } from '@/user/user.module'
import { TodoModule } from '@/todo/todo.module'
import { AuthModule } from '@/auth/auth.module'
import { TestPipeModule } from './test-pipe/test-pipe.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017', {
      dbName: 'todoList',
    }),
    UserModule,
    TodoModule,
    AuthModule,
    TestPipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
