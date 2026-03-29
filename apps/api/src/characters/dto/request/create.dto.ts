import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty({ example: 'Warrior', description: 'Character name' })
  @IsString()
  name: string;
}
