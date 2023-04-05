import { HttpException, Injectable } from '@nestjs/common'
import { TodoDBService } from '@/databases/todo/todoDB.service'
import type { CreateList, DeleteList } from '@/todo/interfaces/todo.interface'
import type { InitCreateListInfo } from '@/todo/interfaces/todo.interface'

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

  deleteList: DeleteList = async (id, uid) => {
    const { createdBy } = await this.todoDBService.findOneById(id)
    if (createdBy && createdBy !== uid)
      return new HttpException('权限不足', 401)

    await this.todoDBService.findByIdAndDelete(id)
    return { message: '删除成功' }
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
