import { IsOptional, IsString, ValidateNested } from 'class-validator';
import {
  CreateScheduledTimeDto,
  ScheduledTimeResponseDto,
} from '../../scheduled-time/dto/create.dto';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @ValidateNested()
  @Type(() => CreateScheduledTimeDto)
  scheduledTime: CreateScheduledTimeDto;
}

export class CreateTaskRepoDto {
  title: string;
  description?: string;
  characterId: string;

  constructor(data: CreateTaskDto, characterId: string) {
    this.title = data.title;
    this.description = data?.description;
    this.characterId = characterId;
  }
}

export class CreateTaskResponseDto {
  id: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  scheduledTime?: ScheduledTimeResponseDto;
}
