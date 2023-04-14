import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Socket } from 'dgram'
import { Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

import type { Types } from 'mongoose'
import type { JwtRequestPayload } from '@/types'
import type { ListInfo } from '@/todo/interfaces/todo.interface'

@UseGuards(JwtAuthGuard)
@WebSocketGateway({
  namespace: 'todo-list',
  transport: ['websocket'],
  cors: { origin: 'http://localhost:3001' },
})
export class TodoGateway {
  @SubscribeMessage('todo-update')
  updateTodo(
    @MessageBody()
    data: Partial<Omit<ListInfo, 'owner'>> & { id: Types.ObjectId },
    @ConnectedSocket() client: Socket,
    @Request() { user }: JwtRequestPayload,
  ) {
    console.log(user)
    // console.log('data', data, user, client, args)
    client.emit('todo-update', data, user)
  }
}
