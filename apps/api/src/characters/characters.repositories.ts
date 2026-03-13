import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Character } from '@prisma/client';

@Injectable()
export class CharactersRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(name: string, userId: string): Promise<Character> {
    return this.prismaService.character.create({
      data: {
        name: name,
        userId,
        stats: {
          create: {},
        },
      },
      include: {
        stats: true,
      },
    });
  }

  async findManyByUserId(userId: string): Promise<Character[]> {
    return this.prismaService.character.findMany({
      where: { userId },
      include: { stats: true },
    });
  }

  async findOneById(id: string): Promise<Character> {
    const character = await this.prismaService.character.findUnique({
      where: { id },
      include: {
        stats: true,
      },
    });
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character;
  }
}
