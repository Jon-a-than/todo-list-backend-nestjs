import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TodoList, ITodoList } from '../schemas/todoList.schema'

@Injectable()
export class TodoDBService {
  constructor(@InjectModel(TodoList.name) private todoModel: Model<TodoList>) {}

  async createList(listInfo: ITodoList) {
    const newList = new this.todoModel(listInfo)
    return await newList.save()
  }
}
