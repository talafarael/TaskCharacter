import { IsArray, IsEnum } from 'class-validator';
import { Day, ScheduleType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ScheduleSlotDto } from './schedule-slot.dto';
import { SpecificDateDto } from './specific-date.dto';

export class CreateScheduledTimeDto {
  @ApiProperty()
  @IsArray()
  specificDates: SpecificDateDto[];

  @ApiProperty({
    enum: ScheduleType,
    example: ScheduleType.ONE_TIME,
    description: 'Schedule type: ONE_TIME or RECURRING',
  })
  @IsEnum(ScheduleType)
  type: ScheduleType;

  @ApiProperty({
    type: [ScheduleSlotDto],
    example: [
      {
        day: [Day.MONDAY, Day.WEDNESDAY],
        timeSlots: ['09:00', '14:00'],
      },
    ],
    description: 'Schedule slots for recurring schedule',
  })
  @IsArray()
  scheduleSlots: ScheduleSlotDto[];
}
