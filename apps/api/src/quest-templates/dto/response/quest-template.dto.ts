import { ApiProperty } from '@nestjs/swagger';
import { ScheduledTimeResponseDto } from '../../../scheduled-time/dto/response/scheduled-time.dto';

export class QuestTemplateResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  lastCreated?: Date | null;
  @ApiProperty()
  scheduledTime?: ScheduledTimeResponseDto | null;
}
