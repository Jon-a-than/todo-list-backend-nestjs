import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { TodoService } from './todo.service'
import { Request, UseGuards } from '@nestjs/common'
import {
  CreateTodoDto,
  ListIdDto,
  UpdateTodoDto,
} from '@/todo/validators/todo.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

import type { JwtRequestPayload } from '@/types'
import { SocketEimts } from './interfaces/todo.interface'

@UseGuards(JwtAuthGuard)
@WebSocketGateway({
  namespace: 'todo-list',
  transport: ['websocket'],
  cors: { origin: 'http://localhost:3001' },
})
export class TodoGateway {
  constructor(private readonly todoService: TodoService) {}

  @SubscribeMessage('join')
  joinRoom(
    @Request() { user }: JwtRequestPayload,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave([...client.rooms][0])
    client.join(user.uid)
  }

  @SubscribeMessage('todo-create')
  async createTodo(
    @MessageBody() data: CreateTodoDto,
    @ConnectedSocket() client: Socket,
    @Request() { user }: JwtRequestPayload,
  ) {
    const listInfo = this.todoService.initCreateListInfo(data, user)
    this.todoService.handleEmitMessage(
      client,
      user.uid,
      SocketEimts.createList,
      await this.todoService.createList(listInfo),
    )
  }

  @SubscribeMessage('todo-update')
  async updateTodo(
    @MessageBody() data: UpdateTodoDto,
    @ConnectedSocket() client: Socket,
    @Request() { user }: JwtRequestPayload,
  ) {
    this.todoService.handleEmitMessage(
      client,
      user.uid,
      SocketEimts.updateList,
      await this.todoService.updateList(user.uid, data),
    )
  }

  @SubscribeMessage('todo-delete')
  async deleteTodo(
    @MessageBody() { id }: ListIdDto,
    @ConnectedSocket() client: Socket,
    @Request() { user }: JwtRequestPayload,
  ) {
    this.todoService.handleEmitMessage(
      client,
      user.uid,
      SocketEimts.deleteList,
      await this.todoService.deleteList(id, user.uid),
    )
  }
}
