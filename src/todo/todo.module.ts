import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoDBModule } from '@/databases/todo/todoDB.module'
import { TodoController } from './todo.controller'

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [TodoDBModule],
})
export class TodoModule {}
