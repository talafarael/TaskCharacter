import { Injectable } from '@nestjs/common';
import {
  CreateTaskDto,
  CreateTaskRepoDto,
  CreateTaskResponseDto,
} from './dto/create.dto';
import { TasksRepository } from './tasks.repositories';
import { ScheduledTimeService } from '../scheduled-time/scheduled-time.service';
import { PaginationTaskDto } from './dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly scheduledTimeService: ScheduledTimeService,
  ) { }

  async create(
    data: CreateTaskDto,
    characterId: string,
  ): Promise<CreateTaskResponseDto> {
    const taskData = new CreateTaskRepoDto(data, characterId);

    const newTask = await this.tasksRepository.create(taskData);
    const scheduledTime = await this.scheduledTimeService.create(
      data.scheduledTime,
      newTask.id,
    );

    return {
      ...newTask,
      scheduledTime,
    };
  }

  async get(data: PaginationTaskDto, characterId: string) { }
  async getOne() { }
}
