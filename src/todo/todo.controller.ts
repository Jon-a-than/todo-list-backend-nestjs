import { TodoService } from './todo.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common'
import { CreateTodoDto, DeleteDto } from './validators/todo.dto'

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
  @Delete('/:id')
  async deleteList(
    @Param(new ValidationPipe()) { id }: DeleteDto,
    @Request() { user }: JwtRequestPayload,
  ) {
    return await this.todoService.deleteList(id, user.uid)
  }
}
