import { Injectable, ForbiddenException } from '@nestjs/common';
import { CharactersRepository } from './characters.repositories';
import { CreateCharacterDto } from './dto/create.dto';
import { Character } from '@prisma/client';

@Injectable()
export class CharactersService {
  constructor(private readonly charactersrepository: CharactersRepository) { }

  async create(data: CreateCharacterDto, userId: string): Promise<Character> {
    return this.charactersrepository.create(data.name, userId);
  }

  async getAll(userId: string): Promise<Character[]> {
    return this.charactersrepository.findManyByUserId(userId);
  }

  async getOne(id: string, userId: string): Promise<Character> {
    const character = await this.charactersrepository.findOneById(id);
    if (character.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return character;
  }
}
