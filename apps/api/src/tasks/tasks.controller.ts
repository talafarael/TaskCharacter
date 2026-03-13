import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ValidMongoIdPipe } from '../common/pipes/valid-mongodb-id';
import { JwtAuthGuard } from '../auth/guards';
import { CreateTaskDto } from './dto/create.dto';
import { PaginationTaskDto } from './dto/pagination.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post(':id')
  async create(
    @Body() data: CreateTaskDto,
    @Param('id', ValidMongoIdPipe) id: string,
  ) {
    return this.tasksService.create(data, id);
  }

  @Get('by-character/:characterId')
  async get(
    @Param('characterId', ValidMongoIdPipe) characterId: string,
    @Query() pagination: PaginationTaskDto,
  ) {
    return this.tasksService.get(pagination, characterId);
  }

  @Get(':id')
  async getOne(@Param('id', ValidMongoIdPipe) id: string) {
    return this.tasksService.getOne(id);
  }
}
