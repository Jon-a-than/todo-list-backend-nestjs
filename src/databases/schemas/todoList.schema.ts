import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TodoListDocument = HydratedDocument<TodoList>

@Schema()
export class TodoList {
  @Prop({ required: true })
  uid: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  finished: boolean

  @Prop({ required: true })
  type: number

  @Prop({ required: true })
  important: boolean

  @Prop({ required: true })
  distribution: number

  @Prop({ required: false })
  description: string

  @Prop({ required: false })
  endTime: number

  @Prop({ required: true })
  createdAt: number

  @Prop({ required: false })
  updatedAt: number

  @Prop({ required: false })
  deletedAt: number
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList)
