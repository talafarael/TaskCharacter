import {
  IsArray,
  IsEnum,
  IsString,
  IsDateString,
  Matches,
} from 'class-validator';
import { Day, ScheduleType } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateScheduledTimeDto {
  @IsArray()
  @IsEnum(Day, { each: true })
  day: Day[];

  @IsArray()
  @IsDateString({}, { each: true })
  @Transform(({ value }) => value.map((date: string) => new Date(date)))
  time: Date[];

  @IsArray()
  @IsString({ each: true })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    each: true,
    message: 'timeSlots must be in format HH:MM',
  })
  timeSlots: string[];

  @IsEnum(ScheduleType)
  type: ScheduleType;
}

export class CreateScheduledTimeRepoDto extends CreateScheduledTimeDto {
  taskId: string;
  constructor(data: CreateScheduledTimeDto, taskId: string) {
    super();
    this.day = data.day;
    this.time = data.time;
    this.timeSlots = data.timeSlots;
    this.type = data.type;
    this.taskId = taskId;
  }
}

export class ScheduledTimeResponseDto {
  id: string;
  day: Day[];
  time: Date[];
  timeSlots: string[];
  type: ScheduleType;
}
