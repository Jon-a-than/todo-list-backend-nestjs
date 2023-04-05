import { TodoService } from './todo.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common'
import { CreateTodoDto } from './validators/todo.dto'

import type { JwtRequestPayload } from '@/types'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getList() {
    return this.todoService.getList()
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createList(
    @Request() { user }: JwtRequestPayload,
    @Body() body: CreateTodoDto,
  ) {
    const listInfo = this.todoService.initCreateListInfo(body, user)
    return await this.todoService.createList(listInfo)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':/uuid')
  updateList() {
    return this.todoService.updateList()
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:uuid')
  deleteList() {
    return this.todoService.deleteList()
  }
}
