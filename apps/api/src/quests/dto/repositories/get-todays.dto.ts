import { Day } from '@prisma/client';

export class GetTodaysQuestRepoDto {
  day: Day;
  today: Date;
  tomorrow: Date;
  characterId: string;
  skip?: number;
  take?: number;
}
