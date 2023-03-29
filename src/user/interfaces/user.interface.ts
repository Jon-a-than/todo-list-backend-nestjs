import { ObjectId } from 'mongoose'

export interface IUser {
  uid: string
  user: string
  phone: string
  pwd: string
}

export interface IUserDB extends IUser {
  _id: ObjectId
}

export interface IRegisterDTO {
  user: string
  pwd1: string
  pwd2: string
  phone: string
  code: number
}
