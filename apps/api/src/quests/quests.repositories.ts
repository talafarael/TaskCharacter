import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetTodaysQuestRepoDto } from './dto/repositories/get-todays.dto';
import { QuestResponseDto } from './dto/response/quest.dto';

@Injectable()
export class QuestsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createTodayQuests(questTemplateIds: string[]) {
    return await this.prismaService.quest.createMany({
      data: questTemplateIds.map((id) => ({
        questTemplateId: id,
        skipDuplicates: true,
      })),
    });
  }

  async updateQuestTemplatesLastUsed(questTemplateIds: string[]) {}

  async getTodayQuests(
    data: GetTodaysQuestRepoDto,
  ): Promise<QuestResponseDto[]> {
    return await this.prismaService.quest.findMany({
      where: {
        questTemplate: {
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
      },
      skip: data?.skip,
      take: data?.take,
      orderBy: {
        questTemplate: {
          title: 'asc',
        },
      },
      include: {
        questTemplate: {
          include: {
            scheduledTime: true,
          },
        },
      },
    });
  }
}
