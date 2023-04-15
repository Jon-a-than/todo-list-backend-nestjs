import { IUserDB } from '@/user/interfaces/user.interface'
import { WsException } from '@nestjs/websockets'
import { Types } from 'mongoose'

export const enum SocketEimts {
  'createList' = 'todo-create',
  'updateList' = 'todo-update',
  'deleteList' = 'todo-delete',
}

interface ReqData {
  title: string
  type: number
  endTime?: number
  important?: boolean
  description?: string
  distribution?: string
}

interface ListInfo extends ReqData {
  owner: string
  createdAt: number
  createdBy: string
  important: boolean
  finished: boolean
  worker: string
  distribution: string
}

type ListInfoDB = ListInfo & { id: string }

interface TodoWebSocketsResponse {
  error?: boolean
  rooms: string[]
}

type UpdateList = (
  uid: string,
  payload: Partial<Omit<ListInfo, 'owner'>> & { id: Types.ObjectId },
) => Promise<TodoWebSocketsResponse>

type InitCreateListInfo = (
  reqData: ReqData,
  user: Omit<IUserDB, 'pwd' | '_id'>,
) => ListInfo

type CreateList = (listInfo: ListInfo) => Promise<boolean>

type DeleteList = (
  id: Types.ObjectId,
  uid: string,
) => Promise<boolean | WsException>

const enum PageId {
  'home',
  'main',
  'plan',
  'distribution',
  'created',
  'task',
}

export { PageId }

export type {
  InitCreateListInfo,
  CreateList,
  DeleteList,
  UpdateList,
  ListInfo,
  ListInfoDB,
}
