import { Module } from '@nestjs/common'
import { TodoDBService } from './todoDB.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TodoList, TodoListSchema } from '../schemas/todoList.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
  ],
  providers: [TodoDBService],
  exports: [TodoDBService],
})
export class TodoDBModule {}
