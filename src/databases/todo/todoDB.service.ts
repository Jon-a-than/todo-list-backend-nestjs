import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TodoList, ITodoList } from '../schemas/todoList.schema'

import type { Types } from 'mongoose'

@Injectable()
export class TodoDBService {
  constructor(@InjectModel(TodoList.name) private todoModel: Model<TodoList>) {}

  async limitedFind(
    limit: number,
    uid: string,
    type: number,
    distribution: string,
  ) {
    return (
      await this.todoModel
        .find({ createdBy: uid, type, distribution })
        .limit(limit)
        .exec()
    ).map((item) => cleanListItem(item))
  }

  async findOneById(id: Types.ObjectId) {
    return cleanListItem(await this.todoModel.findById(id).exec())
  }

  async findOneAndUpdate(id: Types.ObjectId, payload) {
    return await this.todoModel
      .findOneAndUpdate(
        { _id: id },
        { ...payload, updatedAt: new Date().getTime() },
      )
      .exec()
  }

  async findByIdAndDelete(id: Types.ObjectId) {
    return await this.todoModel.findByIdAndDelete(id).exec()
  }

  async createList(listInfo: ITodoList) {
    const newList = new this.todoModel(listInfo)
    return await newList.save()
  }
}

function cleanListItem(item: any) {
  return {
    id: item.id,
    createdBy: item.createdBy,
    title: item.title,
    finished: item.finished,
    type: item.type,
    important: item.important,
    distribution: item.distribution,
    endTime: item?.endTime,
    description: item?.description,
    createdAt: item.createdAt,
  }
}
