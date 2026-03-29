import { Module } from '@nestjs/common';
import { QuestTemplatesService } from './quest-templates.service';
import { QuestTemplatesController } from './quest-templates.controller';
import { QuestTemplatesRepository } from './quest-templates.repositories';
import { ScheduledTimeModule } from '../scheduled-time/scheduled-time.module';

@Module({
  imports: [ScheduledTimeModule],
  controllers: [QuestTemplatesController],
  providers: [QuestTemplatesService, QuestTemplatesRepository],
  exports: [QuestTemplatesService],
})
export class QuestTemplatesModule {}
