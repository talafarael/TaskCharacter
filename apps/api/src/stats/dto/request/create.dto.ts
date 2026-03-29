import { ApiProperty } from '@nestjs/swagger';

export class CreateStatsDto {
  @ApiProperty({ example: 100, description: 'Gold amount', required: false })
  gold: number;

  @ApiProperty({ example: 0, description: 'Experience points', required: false })
  experience: number;

  @ApiProperty({ example: 1, description: 'Character level', required: false })
  level: number;

  @ApiProperty({ example: 10, description: 'Strength stat', required: false })
  strength: number;

  @ApiProperty({ example: 10, description: 'Agility stat', required: false })
  agility: number;

  @ApiProperty({ example: 10, description: 'Intelligence stat', required: false })
  intelligence: number;

  @ApiProperty({ description: 'Character ID' })
  characterId: string;
}
