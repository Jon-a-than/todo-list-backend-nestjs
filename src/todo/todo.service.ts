import { Injectable } from '@nestjs/common'
import { TodoDBService } from '@/databases/todo/todoDB.service'

import type { CreateList } from '@/todo/interfaces/todo.interface'
import { InitCreateListInfo } from '@/todo/interfaces/todo.interface'

@Injectable()
export class TodoService {
  constructor(protected readonly todoDBService: TodoDBService) {}

  getList() {
    return 'getList'
  }

  createList: CreateList = async (todoListInfo) => {
    return {
      message: (await this.todoDBService.createList(todoListInfo))
        ? '创建成功'
        : '创建失败',
    }
  }

  updateList() {
    return 'updateList'
  }

  deleteList() {
    return 'deleteList'
  }

  initCreateListInfo: InitCreateListInfo = (reqData, { uid }) => {
    return {
      createdBy: uid,
      important: false,
      finished: false,
      distribution: uid,
      createdAt: new Date().getTime(),
      ...reqData,
    }
  }
}
