import { Injectable } from '@nestjs/common';
import { StatsRepository } from './stats.repositories';
import { CreateStatsDto } from './dto/request/create.dto';
import { CreateStatsRepoDto } from './dto/repositories/create.dto';
import { Stats } from '@prisma/client';

@Injectable()
export class StatsService {
  constructor(private readonly statsRepository: StatsRepository) { }

  async create(characterId: string, data?: CreateStatsDto): Promise<Stats> {
    const stats = new CreateStatsRepoDto(characterId, data);
    return await this.statsRepository.create(stats);
  }
}
