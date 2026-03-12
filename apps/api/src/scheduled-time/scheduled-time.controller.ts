import { Controller } from '@nestjs/common';
import { ScheduledTimeService } from './scheduled-time.service';

@Controller('scheduled-time')
export class ScheduledTimeController {
  constructor(private readonly scheduledTimeService: ScheduledTimeService) {}
}
