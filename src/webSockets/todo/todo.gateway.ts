import {
  MessageBody,
  // ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
// import { Socket } from 'dgram'
import { Request, UseGuards } from '@nestjs/common'
import { CreateTodoDto } from '@/todo/validators/todo.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

import type { JwtRequestPayload } from '@/types'

@UseGuards(JwtAuthGuard)
@WebSocketGateway({
  namespace: 'todo-list',
  transport: ['websocket'],
  cors: { origin: 'http://localhost:3001' },
})
export class TodoGateway {
  @SubscribeMessage('todo-create')
  createTodo(
    @MessageBody() data: CreateTodoDto,
    @Request() { user }: JwtRequestPayload,
  ) {
    return { data, user }
  }

  @SubscribeMessage('todo-update')
  updateTodo(
    @MessageBody() data: CreateTodoDto,
    @Request() { user }: JwtRequestPayload,
  ) {
    console.log(user)
    return { data, user }
  }

  @SubscribeMessage('todo-delete')
  deleteTodo(
    @MessageBody() data: CreateTodoDto,
    @Request() { user }: JwtRequestPayload,
  ) {
    return { data, user }
  }
}
