import { Injectable } from '@nestjs/common';
import { QuestsRepository } from './quests.repositories';
import { QuestTemplatesService } from '../quest-templates/quest-templates.service';
import { getDay, getTodayAndTomorrow } from '../common/utils/date';
import { PaginationQuestDto } from './dto/request/pagination.dto';
import { QuestResponseDto } from './dto/response/quest.dto';

@Injectable()
export class QuestsService {
  constructor(
    private readonly questsRepository: QuestsRepository,
    private readonly questTemplatesService: QuestTemplatesService,
  ) { }

  async createTodayQuests(characterId: string) {
    const todayQuestTemplates =
      await this.questTemplatesService.getTodasyQuestTemplates(characterId);
    const now = new Date();
    const questTemplateIds = todayQuestTemplates.filter((t) => {
      if (!t.lastCreated) return true;

      const d = new Date(t.lastCreated);

      return !(
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      );
    }).map((template) => template.id);

    const todaysQuests = await this.questsRepository.createTodayQuests(questTemplateIds);
    await this.questTemplatesService.updateQuestTemplatesLastUsed(questTemplateIds);

    return todaysQuests;
  }

  async getTodayQuests(
    query: PaginationQuestDto,
    characterId: string,
  ): Promise<QuestResponseDto[]> {
    const day = getDay(new Date());
    const { today, tomorrow } = getTodayAndTomorrow(new Date());

    return await this.questsRepository.getTodayQuests({
      ...query,
      day,
      today,
      tomorrow,
      characterId,
    });
  }
}
