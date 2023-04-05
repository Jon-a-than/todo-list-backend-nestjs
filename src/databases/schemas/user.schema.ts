import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UesrDocument = HydratedDocument<User>

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
