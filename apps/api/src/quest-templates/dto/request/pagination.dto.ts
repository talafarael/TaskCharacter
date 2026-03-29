import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQuestTemplateDto {
  @ApiProperty({
    example: 10,
    description: 'Number of records',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  take: number;

  @ApiProperty({
    example: 0,
    description: 'Offset for pagination',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  skip: number;
}
