import { Module } from '@nestjs/common';
import { ScheduledTimeService } from './scheduled-time.service';
import { ScheduledTimeController } from './scheduled-time.controller';
import { ScheduledTimeRepository } from './scheduled-time.repositories';

@Module({
  controllers: [ScheduledTimeController],
  providers: [ScheduledTimeService, ScheduledTimeRepository],
  exports: [ScheduledTimeService],
})
export class ScheduledTimeModule {}
