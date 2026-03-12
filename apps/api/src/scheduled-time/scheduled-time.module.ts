import { Module } from '@nestjs/common';
import { ScheduledTimeService } from './scheduled-time.service';
import { ScheduledTimeController } from './scheduled-time.controller';

@Module({
  controllers: [ScheduledTimeController],
  providers: [ScheduledTimeService],
})
export class ScheduledTimeModule {}
