import { IUserDB } from '@/user/interfaces/user.interface'

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

export type { InitCreateListInfo, CreateList }
