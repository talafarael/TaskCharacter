import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStatsRepoDto } from './dto/create.dto';
import { Stats } from '@prisma/client';

@Injectable()
export class StatsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateStatsRepoDto): Promise<Stats> {
    return this.prismaService.stats.create({ data });
  }
}
