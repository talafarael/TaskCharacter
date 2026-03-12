import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateScheduledTimeDto,
  CreateScheduledTimeRepoDto,
} from './dto/create.dto';
import { ScheduledTime } from '@prisma/client';

@Injectable()
export class ScheduledTimeRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateScheduledTimeRepoDto): Promise<ScheduledTime> {
    return await this.prismaService.scheduledTime.create({
      data,
    });
  }
}
