import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TodoList, ITodoList } from '../schemas/todoList.schema'

import type { Types } from 'mongoose'

@Injectable()
export class TodoDBService {
  constructor(@InjectModel(TodoList.name) private todoModel: Model<TodoList>) {}

  async limitedFind(limit: number, uid: string, pageId: number) {
    return (
      await this.todoModel
        .find(typeToQuery(pageId, uid))
        .limit(limit)
        .lean()
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
  const { _id, __v, ...omittedItem } = item
  return {
    id: _id,
    ...omittedItem,
  }
}

const enum PageId {
  'home',
  'main',
  'plan',
  'distribution',
  'created',
  'task',
}
function typeToQuery(pageId: number, uid: string) {
  switch (pageId) {
    case PageId.main:
      return { createdBy: uid, important: true }
    case PageId.plan:
      return { createdBy: uid }
    case PageId.distribution:
      return { createdBy: { $ne: uid }, distribution: uid }
    case PageId.created:
      return { createdBy: uid, distribution: { $ne: uid } }
    case PageId.task:
      return { createdBy: uid, type: { $lte: 10 } }
    default:
      return { createdBy: uid, type: pageId }
  }
}
