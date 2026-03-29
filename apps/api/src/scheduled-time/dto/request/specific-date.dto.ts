import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDateString } from 'class-validator';

export class SpecificDateDto {
  @ApiProperty({
    type: [String],
    format: 'date-time',
    example: ['2025-03-15T10:00:00.000Z'],
    description: 'Dates for one-time schedule',
  })
  @IsArray()
  @IsDateString({}, { each: true })
  @Transform(({ value }) => value.map((date: string) => new Date(date)))
  date: Date;
}
