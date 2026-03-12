import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repositories';
import { ScheduledTimeModule } from '../scheduled-time/scheduled-time.module';

@Module({
  imports: [ScheduledTimeModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
