import { Controller, Get, Query } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { PaginationQuestTemplateDto } from '../quest-templates/dto/request/pagination.dto';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) { }

  @Get('/:characrterId')
  async getTodayQuests(
    @Query() query: PaginationQuestTemplateDto,
    @Query('characrterId') characterId: string,
  ) {
    return await this.questsService.getTodayQuests(query, characterId);
  }

  async createTodayQuests(characterId: string) { }
}
