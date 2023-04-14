import { IUserDB } from '@/user/interfaces/user.interface'
import { Types } from 'mongoose'
import { HttpException } from '@nestjs/common'

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

type GetList = (
  limit: number,
  uid: string,
  pageId: number,
) => Promise<{ list: ListInfoDB[] }>

type GetListById = (id: Types.ObjectId) => Promise<ListInfoDB | Error>

type UpdateList = (
  uid: string,
  payload: Partial<Omit<ListInfo, 'owner'>> & { id: Types.ObjectId },
) => Promise<{ message: string }>

type InitCreateListInfo = (
  reqData: ReqData,
  user: Omit<IUserDB, 'pwd' | '_id'>,
) => ListInfo

type CreateList = (listInfo: ListInfo) => unknown

type DeleteList = (
  id: Types.ObjectId,
  uid: string,
) => Promise<{ message: string } | HttpException>

export type {
  InitCreateListInfo,
  GetList,
  CreateList,
  DeleteList,
  UpdateList,
  GetListById,
  ListInfo,
  ListInfoDB,
}
