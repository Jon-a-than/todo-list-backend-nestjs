import { TodoService } from './todo.service'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  Request,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common'
import { CreateTodoDto, DeleteDto, GetListDto } from './validators/todo.dto'

import type { JwtRequestPayload } from '@/types'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getList(
    @Query(new ValidationPipe()) { limit, type, distribution }: GetListDto,
    @Request() { user }: JwtRequestPayload,
  ) {
    return await this.todoService.getList(+limit, user.uid, +type, distribution)
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
