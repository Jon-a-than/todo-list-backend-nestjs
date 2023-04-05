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
