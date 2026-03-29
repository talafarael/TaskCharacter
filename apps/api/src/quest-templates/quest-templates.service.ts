import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQuestTemplateDto } from './dto/request/pagination.dto';
import { QuestTemplateResponseDto } from './dto/response/quest-template.dto';
import { QuestTemplatesRepository } from './quest-templates.repositories';
import { ScheduledTimeService } from '../scheduled-time/scheduled-time.service';
import { CreateQuestTemplateDto } from './dto/request/create.dto';
import { GetQuestTemplateResponseDto } from './dto/response/get.dto';
import { getDay, getTodayAndTomorrow } from '../common/utils/date';

@Injectable()
export class QuestTemplatesService {
  constructor(
    private readonly questTemplatesRepository: QuestTemplatesRepository,
    private readonly scheduledTimeService: ScheduledTimeService,
  ) {}

  async create(
    data: CreateQuestTemplateDto,
    characterId: string,
  ): Promise<QuestTemplateResponseDto> {
    const newQuestTemplate = await this.questTemplatesRepository.create({
      title: data.title,
      description: data.description,
      characterId,
    });
    const scheduledTime = await this.scheduledTimeService.create(
      data.scheduledTime,
      newQuestTemplate.id,
    );

    return {
      ...newQuestTemplate,
      scheduledTime,
    };
  }

  async get(
    query: PaginationQuestTemplateDto,
    characterId: string,
  ): Promise<GetQuestTemplateResponseDto> {
    const questTemplates = await this.questTemplatesRepository.get({
      ...query,
      characterId,
    });
    return { questTemplates };
  }

  async getOne(id: string): Promise<QuestTemplateResponseDto> {
    const questTemplate = await this.questTemplatesRepository.getOne(id);
    if (!questTemplate) {
      throw new NotFoundException('Quest template not found');
    }
    return questTemplate;
  }

  async updateQuestTemplatesLastUsed(
    questTemplateIds: string[],
  ): Promise<void> {
    return await this.questTemplatesRepository.updateQuestTemplatesLastUsed(
      questTemplateIds,
    );
  }
  async getTodasyQuestTemplates(
    characterId: string,
  ): Promise<QuestTemplateResponseDto[]> {
    const day = getDay(new Date());
    const { today, tomorrow } = getTodayAndTomorrow(new Date());
    return await this.questTemplatesRepository.getTodays({
      characterId,
      day,
      today,
      tomorrow,
    });
  }
}
