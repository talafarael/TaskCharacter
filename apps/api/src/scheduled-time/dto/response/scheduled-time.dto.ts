import { ApiProperty } from '@nestjs/swagger';
import { Day, ScheduleType } from '@prisma/client';

export class ScheduleSlotResponseDto {
  @ApiProperty({ enum: Day })
  day: Day;

  @ApiProperty({ type: [String] })
  timeSlots: string[];
}

export class SpecificDate {
  @ApiProperty({ type: String, format: 'date-time' })
  date: Date;
}

export class ScheduledTimeResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ScheduleType })
  type: ScheduleType;

  @ApiProperty({ type: [SpecificDate], required: false })
  specificDates: SpecificDate[];

  @ApiProperty({ type: [ScheduleSlotResponseDto], required: false })
  scheduleSlots: ScheduleSlotResponseDto[];
}
