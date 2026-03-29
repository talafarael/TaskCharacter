import { CreateQuestTemplateDto } from '../request/create.dto';

export class CreateQuestTemplateRepoDto {
  title: string;
  description?: string;
  characterId: string;
}
