import { HttpException, Injectable } from '@nestjs/common'
import { TodoDBService } from '@/databases/todo/todoDB.service'
import type * as ListCURD from '@/todo/interfaces/todo.interface'

@Injectable()
export class TodoService {
  constructor(protected readonly todoDBService: TodoDBService) {}

  getList: ListCURD.GetList = async (limit, uid, pageId) => {
    return {
      list: await this.todoDBService.limitedFind(limit, uid, pageId),
    }
  }

  getListById: ListCURD.GetListById = async (id) => {
    return (
      (await this.todoDBService.findOneById(id)) ??
      new HttpException('id查询失败', 400)
    )
  }

  createList: ListCURD.CreateList = async (todoListInfo) => {
    const createRes = !!(await this.todoDBService.createList(todoListInfo))
    return {
      message: createRes ? '创建成功' : '创建失败',
    }
  }

  updateList: ListCURD.UpdateList = async (uid, listPayload) => {
    const preListInfo = await this.todoDBService.findOneById(listPayload.id)
    if (!preListInfo) return new HttpException('id查询失败', 400)
    if (preListInfo.createdBy && preListInfo.createdBy !== uid)
      return new HttpException('权限不足', 401)

    const { id, ...omittedList } = listPayload
    await this.todoDBService.findOneAndUpdate(id, omittedList)
    return { message: '更新成功' }
  }

  deleteList: ListCURD.DeleteList = async (id, uid) => {
    const createdBy = (await this.todoDBService.findOneById(id))?.createdBy
    if (createdBy && createdBy !== uid)
      return new HttpException('权限不足', 401)

    await this.todoDBService.findByIdAndDelete(id)
    return { message: '删除成功' }
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
      createdAt: new Date().getTime(),
      ...reqData,
    }
  }
}
