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
    client.join(user.uid)
  }

  @SubscribeMessage('todo-create')
  async createTodo(
    @MessageBody() data: CreateTodoDto,
    @ConnectedSocket() client: Socket,
    @Request() { user }: JwtRequestPayload,
  ) {
    const listInfo = this.todoService.initCreateListInfo(data, user)
    client.emit(
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
    const { error, rooms } = await this.todoService.updateList(user.uid, data)
    console.log(rooms)
    client.to(rooms).emit(SocketEimts.updateList, !error)
  }

  @SubscribeMessage('todo-delete')
  async deleteTodo(
    @MessageBody() { id }: ListIdDto,
    @ConnectedSocket() client: Socket,
    @Request() { user }: JwtRequestPayload,
  ) {
    client.emit(
      SocketEimts.deleteList,
      await this.todoService.deleteList(id, user.uid),
    )
  }
}
