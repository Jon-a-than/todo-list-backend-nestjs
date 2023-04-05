import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TodoListDocument = HydratedDocument<TodoList>

export interface ITodoList {
  createdBy: string
  title: string
  finished: boolean
  type: number
  important: boolean
  distribution: string
  description?: string
  endTime?: number
  createdAt: number
  updatedAt?: number
}

@Schema()
export class TodoList implements ITodoList {
  @Prop({ required: true })
  createdBy: string
  @Prop({ required: true })
  title: string
  @Prop({ required: true })
  finished: boolean
  @Prop({ required: true })
  type: number
  @Prop({ required: true })
  important: boolean
  @Prop({ required: true })
  distribution: string
  @Prop({ required: false })
  description: string
  @Prop({ required: false })
  endTime: number
  @Prop({ required: true })
  createdAt: number
  @Prop({ required: false })
  updatedAt: number
}

const TodoListSchema = SchemaFactory.createForClass(TodoList)
export { TodoListSchema }
