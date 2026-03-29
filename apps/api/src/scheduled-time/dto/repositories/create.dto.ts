import { CreateScheduledTimeDto } from '../request/create.dto';

export class CreateScheduledTimeRepoDto extends CreateScheduledTimeDto {
  questTemplateId: string;
}
