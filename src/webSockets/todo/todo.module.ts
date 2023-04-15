import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoDBModule } from '@/databases/todo/todoDB.module'
import { TodoGateway } from './todo.gateway'

@Module({
  providers: [TodoService, TodoGateway],
  imports: [TodoDBModule],
})
export class TodoModule {}
