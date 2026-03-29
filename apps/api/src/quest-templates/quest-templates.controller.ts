import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestTemplatesService } from './quest-templates.service';
import { ValidMongoIdPipe } from '../common/pipes/valid-mongodb-id';
import { JwtAuthGuard } from '../auth/guards';
import { CreateQuestTemplateDto } from './dto/request/create.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { QuestTemplateResponseDto } from './dto/response/quest-template.dto';
import { PaginationQuestTemplateDto } from './dto/request/pagination.dto';

@ApiTags('QuestTemplates')
@ApiBearerAuth()
@Controller('quest-templates')
@UseGuards(JwtAuthGuard)
export class QuestTemplatesController {
  constructor(private readonly questTemplatesService: QuestTemplatesService) { }

  @Post(':id')
  @ApiOperation({ summary: 'Create quest template for character' })
  @ApiParam({ name: 'id', description: 'Character ID' })
  @ApiBody({ type: CreateQuestTemplateDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: QuestTemplateResponseDto,
  })
  async create(
    @Body() data: CreateQuestTemplateDto,
    @Param('id', ValidMongoIdPipe) id: string,
  ) {
    return await this.questTemplatesService.create(data, id);
  }

  @Get('by-character/:characrterId')
  @ApiOperation({ summary: 'Get quest templates by character ID' })
  @ApiParam({ name: 'characrterId', description: 'Character ID' })
  async get(
    @Query() query: PaginationQuestTemplateDto,
    @Param('characrterId', ValidMongoIdPipe) id: string,
  ) {
    return await this.questTemplatesService.get(query, id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quest template by ID' })
  @ApiParam({ name: 'id', description: 'Quest template ID' })
  async getOne(@Param('id', ValidMongoIdPipe) id: string) {
    return await this.questTemplatesService.getOne(id);
  }
}
