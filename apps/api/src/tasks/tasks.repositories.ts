import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskRepoDto } from './dto/create.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateTaskRepoDto): Promise<Task> {
    return await this.prismaService.task.create({
      data: { ...data },
    });
  }

  async findManyByCharacterId(
    characterId: string,
    skip = 0,
    take = 20,
  ): Promise<Task[]> {
    return this.prismaService.task.findMany({
      where: { characterId },
      include: { scheduledTime: true },
      skip,
      take,
    });
  }

  async findOneById(id: string): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: { scheduledTime: true },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
