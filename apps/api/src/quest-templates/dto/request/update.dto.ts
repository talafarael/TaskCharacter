import { PartialType } from '@nestjs/swagger';
import { CreateQuestTemplateDto } from './create.dto';

export class UpdateQuestTemplateDto extends PartialType(CreateQuestTemplateDto) {}
