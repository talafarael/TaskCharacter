import { Injectable } from '@nestjs/common';
import { ScheduledTimeRepository } from './scheduled-time.repositories';
import { CreateScheduledTimeDto } from './dto/request/create.dto';
import { ScheduledTimeResponseDto } from './dto/response/scheduled-time.dto';

@Injectable()
export class ScheduledTimeService {
  constructor(
    private readonly scheduledTimeRepository: ScheduledTimeRepository,
  ) { }

  async create(
    data: CreateScheduledTimeDto,
    questTemplateId: string,
  ): Promise<ScheduledTimeResponseDto> {
    const scheduledTime = await this.scheduledTimeRepository.create({
      ...data,
      questTemplateId,
    });
    return scheduledTime;
  }
}
