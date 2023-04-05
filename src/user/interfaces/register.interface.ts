import { ResponseData, Status } from '@/types'

type Register = (
  user: string,
  pwd: string,
  phone: string,
  code: number,
) => Promise<ResponseData>
type SendCode = (phone: string) => Promise<ResponseData>
type AddUser = (user: string, phone: string, pwd: string) => Promise<boolean>
type HasRegistered = (user: string, phone: string) => Promise<Status>
type CreateCode = (phone: string) => number
type CheckPhoneCode = (phone: string, code: number) => Promise<Status>

export type {
  Register,
  SendCode,
  AddUser,
  HasRegistered,
  CheckPhoneCode,
  CreateCode,
}
