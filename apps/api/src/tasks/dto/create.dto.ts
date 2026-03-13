import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import {
  CreateScheduledTimeDto,
  ScheduledTimeResponseDto,
} from '../../scheduled-time/dto/create.dto';

export class CreateTaskDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  title: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string | undefined }) => value?.trim())
  description?: string;

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
