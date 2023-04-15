import { TodoDBService } from '@/databases/todo/todoDB.service'
import { Injectable } from '@nestjs/common'

import type * as ListCURD from './interfaces/todo.interface'

@Injectable()
export class TodoService {
  constructor(protected readonly todoDBService: TodoDBService) {}

  createList: ListCURD.CreateList = async function (todoListInfo) {
    return !!(await this.todoDBService.createList(todoListInfo))
  }

  deleteList: ListCURD.DeleteList = async function (listId, uid) {
    const list = await this.todoDBService.findOneById(listId)
    if (!list || list.createdBy !== uid) return false
    this.todoDBService.findByIdAndDelete(listId)
    return true
  }

  updateList: ListCURD.UpdateList = async function (uid, payload) {
    const list = await this.todoDBService.findOneById(payload.id)
    if (!list || list.createdBy !== uid) return { error: true, rooms: [uid] }
    this.todoDBService.findOneAndUpdate(payload.id, payload)
    return { rooms: [...new Set([uid, list.distribution])] }
  }

  initCreateListInfo: ListCURD.InitCreateListInfo = (
    reqData,
    { uid, user },
  ) => {
    return {
      owner: user,
      createdBy: uid,
      important: false,
      finished: false,
      distribution: uid,
      worker: user,
      createdAt: new Date().getTime(),
      ...reqData,
    }
  }
}
