import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TodoList, ITodoList } from '../schemas/todoList.schema'
import { filterDocument } from '@/databases/tools/filterDocument'

import type { Types } from 'mongoose'
import { ListInfoDB } from '@/todo/interfaces/todo.interface'

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
    ).map(filterDocument)
  }

  async findOneById(id: Types.ObjectId): Promise<ListInfoDB | null> {
    const document = await this.todoModel.findById(id).lean().exec()
    return document ? filterDocument(document) : null
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
    return filterDocument(await newList.save())
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
      return { createdBy: uid, endTime: { $exists: true } }
    case PageId.distribution:
      return { createdBy: { $ne: uid }, distribution: uid }
    case PageId.created:
      return { createdBy: uid, distribution: { $ne: uid } }
    case PageId.task:
      return { createdBy: uid, type: { $lte: 10 }, distribution: uid }
    default:
      return { createdBy: uid, type: pageId }
  }
}
