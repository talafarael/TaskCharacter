import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;
}
