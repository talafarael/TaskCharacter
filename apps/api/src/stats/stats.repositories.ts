import { Injectable } from '@nestjs/common';
import { CreateStatsRepoDto } from './dto/repositories/create.dto';
import { Stats } from '@prisma/client';

@Injectable()
export class StatsRepository {
  async create(data: CreateStatsRepoDto): Promise<Stats> { }
}
