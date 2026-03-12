import { Injectable } from '@nestjs/common';
import { CharactersRepository } from './characters.repositories';
import { CreateCharacterDto } from './dto/create.dto';
import { Character } from '@prisma/client';

@Injectable()
export class CharactersService {
  constructor(private readonly charactersrepository: CharactersRepository) { }

  async create(data: CreateCharacterDto, userId: string): Promise<Character> {
    const character = await this.charactersrepository.create(data.name, userId);
    return character;
  }
  async getOne(id: string): Promise<Character> {
    return await this.charactersrepository.findOneById(id);
  }
}
