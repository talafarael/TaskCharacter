import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskRepoDto } from './dto/create.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksRepository {
  constructor(private readonly prismaService: PrismaService) { }
  async create(data: CreateTaskRepoDto): Promise<Task> {
    return await this.prismaService.task.create({
      data: {
        ...data,
      },
    });
  }
}
