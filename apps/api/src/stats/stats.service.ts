import { Injectable } from '@nestjs/common';
import { StatsRepository } from './stats.repositories';
import { CreateStatsDto, CreateStatsRepoDto } from './dto/create.dto';
import { Stats } from '@prisma/client';

@Injectable()
export class StatsService {
  constructor(private readonly statsRepository: StatsRepository) { }

  async create(characterId: string, data?: CreateStatsDto): Promise<Stats> {
    const stats = new CreateStatsRepoDto(characterId, data);
    return await this.statsRepository.create(stats);
  }
}
