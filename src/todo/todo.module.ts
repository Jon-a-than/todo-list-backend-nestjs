import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoDBModule } from '@/databases/todo/todoDB.module'
import { TodoController } from './todo.controller'
import { TodoGateway } from '@/todo/gateways/todo.gateway'

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoGateway],
  imports: [TodoDBModule],
})
export class TodoModule {}
