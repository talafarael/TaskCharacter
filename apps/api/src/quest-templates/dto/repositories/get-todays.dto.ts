import { Day } from '@prisma/client';

export class GetTodaysQuestTemplatesRepoDto {
  day: Day;
  characterId: string;
  today: Date;
  tomorrow: Date;
  skip?: number;
  take?: number;
}
