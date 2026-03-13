import { Injectable } from '@nestjs/common';
import {
  CreateTaskDto,
  CreateTaskRepoDto,
  CreateTaskResponseDto,
} from './dto/create.dto';
import { TasksRepository } from './tasks.repositories';
import { ScheduledTimeService } from '../scheduled-time/scheduled-time.service';
import { PaginationTaskDto } from './dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly scheduledTimeService: ScheduledTimeService,
    private readonly prismaService: PrismaService,
  ) { }

  async create(
    data: CreateTaskDto,
    characterId: string,
  ): Promise<CreateTaskResponseDto> {
    const taskData = new CreateTaskRepoDto(data, characterId);

    return this.prismaService.$transaction(async () => {
      const newTask = await this.tasksRepository.create(taskData);
      const scheduledTime = await this.scheduledTimeService.create(
        data.scheduledTime,
        newTask.id,
      );
      return { ...newTask, scheduledTime };
    });
  }

  async get(pagination: PaginationTaskDto, characterId: string): Promise<Task[]> {
    return this.tasksRepository.findManyByCharacterId(
      characterId,
      pagination.skip ?? 0,
      pagination.limit ?? 20,
    );
  }

  async getOne(id: string): Promise<Task> {
    return this.tasksRepository.findOneById(id);
  }
}
