import { IUserDB } from '@/user/interfaces/user.interface'
import { Types } from 'mongoose'
import { HttpException } from '@nestjs/common'

type GetList = (
  limit: number,
  uid: string,
  type: number,
  distribution: string,
) => Promise<{
  list: {
    id: string
    createdBy: string
    title: string
    finished: boolean
    type: number
    important: boolean
    distribution: string
    endTime?: number
    description?: string
    createdAt: number
  }[]
}>

interface ReqData {
  title: string
  type: number
  endTime?: number
  important?: boolean
  description?: string
  distribution?: string
}

interface ListInfo extends ReqData {
  createdAt: number
  createdBy: string
  important: boolean
  finished: boolean
  distribution: string
}

type UpdateList = (
  uid: string,
  payload: Partial<ListInfo> & { id: Types.ObjectId },
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

export type { InitCreateListInfo, GetList, CreateList, DeleteList, UpdateList }
