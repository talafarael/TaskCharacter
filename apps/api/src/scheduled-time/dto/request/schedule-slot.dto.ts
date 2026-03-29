import { ApiProperty } from '@nestjs/swagger';
import { Day } from '@prisma/client';
import { IsArray, IsEnum, IsString, Matches } from 'class-validator';

export class ScheduleSlotDto {
  @ApiProperty({
    enum: Day,
    isArray: true,
    example: [Day.MONDAY, Day.WEDNESDAY],
    description: 'Days of week for recurring schedule',
  })
  @IsArray()
  @IsEnum(Day, { each: true })
  day: Day;

  @ApiProperty({
    type: [String],
    example: ['09:00', '14:00'],
    description: 'Time slots in HH:MM format',
  })
  @IsArray()
  @IsString({ each: true })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    each: true,
    message: 'timeSlots must be in format HH:MM',
  })
  timeSlots: string[];
}
