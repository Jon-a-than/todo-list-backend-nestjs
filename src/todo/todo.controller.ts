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
import {
  CreateTodoDto,
  ListIdDto,
  GetListDto,
  UpdateTodoDto,
} from './validators/todo.dto'

import type { JwtRequestPayload } from '@/types'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getList(
    @Query(new ValidationPipe()) { limit, pageId }: GetListDto,
    @Request() { user }: JwtRequestPayload,
  ) {
    return await this.todoService.getList(+limit, user.uid, +pageId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getListById(@Param(new ValidationPipe()) { id }: ListIdDto) {
    return await this.todoService.getListById(id)
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
  @Patch()
  updateList(
    @Request() { user }: JwtRequestPayload,
    @Body() body: UpdateTodoDto,
  ) {
    return this.todoService.updateList(user.uid, body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteList(
    @Param(new ValidationPipe()) { id }: ListIdDto,
    @Request() { user }: JwtRequestPayload,
  ) {
    return await this.todoService.deleteList(id, user.uid)
  }
}
