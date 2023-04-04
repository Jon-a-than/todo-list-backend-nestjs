import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TodoList } from '../schemas/todoList.schema'

@Injectable()
export class TodoDBService {
  constructor(@InjectModel(TodoList.name) private catModel: Model<TodoList>) {}
}
