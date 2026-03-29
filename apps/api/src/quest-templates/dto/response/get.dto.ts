import { ApiProperty } from '@nestjs/swagger';
import { QuestTemplateResponseDto } from './quest-template.dto';

export class GetQuestTemplateResponseDto {
  @ApiProperty({ type: [QuestTemplateResponseDto] })
  questTemplates: QuestTemplateResponseDto[];
}
