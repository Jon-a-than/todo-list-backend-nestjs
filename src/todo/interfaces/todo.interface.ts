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
  createdAt: number
  createdBy: string
  important: boolean
  finished: boolean
  distribution: string
}

type InitCreateListInfo = (
  reqData: ReqData,
  user: Omit<IUserDB, 'pwd' | '_id'>,
) => ListInfo
type CreateList = (listInfo: ListInfo) => unknown
type DeleteList = (
  id: Types.ObjectId,
  uid: string,
) => Promise<{ message: string } | HttpException>

export type { InitCreateListInfo, CreateList, DeleteList }
