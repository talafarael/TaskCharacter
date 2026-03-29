import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateScheduledTimeDto } from '../../../scheduled-time/dto/request/create.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestTemplateDto {
  @ApiProperty({ example: 'Buy groceries', description: 'Quest template title' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Milk, bread, eggs',
    description: 'Quest template description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: CreateScheduledTimeDto,
    description: 'Quest template schedule',
  })
  @ValidateNested()
  @Type(() => CreateScheduledTimeDto)
  scheduledTime: CreateScheduledTimeDto;
}
