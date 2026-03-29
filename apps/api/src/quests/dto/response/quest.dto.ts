import { ApiProperty } from '@nestjs/swagger';
import { QuestTemplateResponseDto } from '../../../quest-templates/dto/response/quest-template.dto';

export class QuestResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isCompleted: boolean;

  @ApiProperty()
  completedAt?: Date | null;

  @ApiProperty()
  questTemplate?: QuestTemplateResponseDto | null;
}
