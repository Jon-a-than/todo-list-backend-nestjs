import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UesrDocument = HydratedDocument<User>

export interface IUser {
  user: string
  pwd: string
  phone: string
  uid: string
}

@Schema()
export class User {
  @Prop()
  user: string

  @Prop()
  pwd: string

  @Prop()
  phone: string

  @Prop()
  uid: string
}

export const UserSchema = SchemaFactory.createForClass(User)
