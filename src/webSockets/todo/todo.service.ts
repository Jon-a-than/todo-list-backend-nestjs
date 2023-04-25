import { TodoDBService } from '@/databases/todo/todoDB.service'
import { Injectable } from '@nestjs/common'

import type {
  CreateList,
  DeleteList,
  UpdateList,
  HandleEmitMessage,
  InitCreateListInfo,
} from './interfaces/todo.interface'

@Injectable()
export class TodoService {
  constructor(protected readonly todoDBService: TodoDBService) {}

  createList: CreateList = async function (todoListInfo) {
    const newListRes = await this.todoDBService.createList(todoListInfo)
    return { error: !newListRes, room: todoListInfo.distribution }
  }

  deleteList: DeleteList = async function (listId, uid) {
    const list = await this.todoDBService.findOneById(listId)
    if (!list || list.createdBy !== uid) return { error: true, room: uid }
    this.todoDBService.findByIdAndDelete(listId)
    return { room: list.distribution }
  }

  updateList: UpdateList = async function (uid, payload) {
    const list = await this.todoDBService.findOneById(payload.id)
    if (!list || ![list.createdBy, list.distribution].includes(uid))
      return { error: true, room: uid }
    this.todoDBService.findOneAndUpdate(payload.id, payload)
    return { room: list.createdBy === uid ? list.distribution : list.createdBy }
  }

  handleEmitMessage: HandleEmitMessage = function (
    client,
    uid,
    EMIT,
    { error, room },
  ) {
    client.join(room)
    client.in(room).emit(EMIT, !error)
    if (room !== uid) client.leave(room)
  }

  initCreateListInfo: InitCreateListInfo = (reqData, { uid, user }) => {
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
