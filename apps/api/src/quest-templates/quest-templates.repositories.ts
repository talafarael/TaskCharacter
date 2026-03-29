import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestTemplateRepoDto } from './dto/repositories/create.dto';
import { QuestTemplate } from '@prisma/client';
import { GetQuestTemplateRepoDto } from './dto/repositories/get.dto';
import { GetTodaysQuestTemplatesRepoDto } from './dto/repositories/get-todays.dto';

@Injectable()
export class QuestTemplatesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateQuestTemplateRepoDto): Promise<QuestTemplate> {
    return await this.prismaService.questTemplate.create({
      data: {
        ...data,
      },
    });
  }

  async get(data: GetQuestTemplateRepoDto): Promise<QuestTemplate[]> {
    return await this.prismaService.questTemplate.findMany({
      where: {
        characterId: data.characterId,
      },
      skip: data.skip,
      take: data.take,
      include: {
        scheduledTime: true,
      },
    });
  }

  async updateQuestTemplatesLastUsed(
    questTemplateIds: string[],
  ): Promise<void> {
    await this.prismaService.questTemplate.updateMany({
      where: {
        id: { in: questTemplateIds },
      },
      data: {
        lastUsed: new Date(),
      },
    });
  }

  async getOne(id: string): Promise<QuestTemplate | null> {
    return await this.prismaService.questTemplate.findFirst({
      where: {
        id,
      },
      include: {
        scheduledTime: true,
      },
    });
  }

  async getTodays(
    data: GetTodaysQuestTemplatesRepoDto,
  ): Promise<QuestTemplate[]> {
    return await this.prismaService.questTemplate.findMany({
      where: {
        characterId: data.characterId,
        scheduledTime: {
          OR: [
            {
              scheduleSlots: {
                some: {
                  day: data.day,
                },
              },
            },
            {
              specificDates: {
                some: {
                  date: {
                    gte: data.today,
                    lt: data.tomorrow,
                  },
                },
              },
            },
          ],
        },
      },
      skip: data?.skip,
      take: data?.take,
      orderBy: {
        title: 'asc',
      },
      include: {
        scheduledTime: true,
      },
    });
  }
}
