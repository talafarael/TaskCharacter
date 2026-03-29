import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { QuestsRepository } from './quests.repositories';
import { QuestTemplatesModule } from '../quest-templates/quest-templates.module';

@Module({
  imports: [QuestTemplatesModule],
  controllers: [QuestsController],
  providers: [QuestsService, QuestsRepository],
})
export class QuestsModule {}
