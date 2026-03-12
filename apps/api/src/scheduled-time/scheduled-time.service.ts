import { Injectable } from '@nestjs/common';
import { ScheduledTimeRepository } from './scheduled-time.repositories';
import {
  CreateScheduledTimeDto,
  CreateScheduledTimeRepoDto,
  ScheduledTimeResponseDto,
} from './dto/create.dto';

@Injectable()
export class ScheduledTimeService {
  constructor(
    private readonly scheduledTimeRepository: ScheduledTimeRepository,
  ) { }

  async create(
    data: CreateScheduledTimeDto,
    taskId: string,
  ): Promise<ScheduledTimeResponseDto> {
    const scheduledTimeData = new CreateScheduledTimeRepoDto(data, taskId);
    const scheduledTime =
      await this.scheduledTimeRepository.create(scheduledTimeData);
    return scheduledTime;
  }
}
