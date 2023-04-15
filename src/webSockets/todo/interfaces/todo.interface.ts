import { IUserDB } from '@/user/interfaces/user.interface'
import { Types } from 'mongoose'
import { Socket } from 'socket.io'

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
  room: string
}

type UpdateList = (
  uid: string,
  payload: Partial<Omit<ListInfo, 'owner'>> & { id: Types.ObjectId },
) => Promise<TodoWebSocketsResponse>

type InitCreateListInfo = (
  reqData: ReqData,
  user: Omit<IUserDB, 'pwd' | '_id'>,
) => ListInfo

type CreateList = (listInfo: ListInfo) => Promise<TodoWebSocketsResponse>

type DeleteList = (
  id: Types.ObjectId,
  uid: string,
) => Promise<TodoWebSocketsResponse>

type HandleEmitMessage = (
  client: Socket,
  uid: string,
  EMIT: SocketEimts,
  res: TodoWebSocketsResponse,
) => void

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
  HandleEmitMessage,
  CreateList,
  DeleteList,
  UpdateList,
  ListInfo,
  ListInfoDB,
}
