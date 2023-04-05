import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TodoList, ITodoList } from '../schemas/todoList.schema'

import type { Types } from 'mongoose'

@Injectable()
export class TodoDBService {
  constructor(@InjectModel(TodoList.name) private todoModel: Model<TodoList>) {}

  async findOneById(id: Types.ObjectId) {
    return this.todoModel.findById(id)
  }

  async findByIdAndDelete(id: Types.ObjectId) {
    return this.todoModel.findByIdAndDelete(id)
  }

  async createList(listInfo: ITodoList) {
    const newList = new this.todoModel(listInfo)
    return await newList.save()
  }
}
