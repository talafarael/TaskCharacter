import { Injectable } from '@nestjs/common';
import { CharactersRepository } from './characters.repositories';
import { CreateCharacterDto } from './dto/request/create.dto';
import { Character } from '@prisma/client';

@Injectable()
export class CharactersService {
  constructor(private readonly charactersRepository: CharactersRepository) { }

  async create(data: CreateCharacterDto, userId: string): Promise<Character> {
    const character = await this.charactersRepository.create(data.name, userId);
    return character;
  }
  async getOne(id: string): Promise<Character> {
    return await this.charactersRepository.findOneById(id);
  }
}
