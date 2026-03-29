import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { JwtAuthGuard } from '../auth/guards';
import { JwtPayloadDto } from '../auth/dto/response/auth-user.dto';
import { CreateCharacterDto } from './dto/request/create.dto';
import { ValidMongoIdPipe } from '../common/pipes/valid-mongodb-id';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Characters')
@ApiBearerAuth()
@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @Post()
  @ApiOperation({ summary: 'Create character' })
  @ApiBody({ type: CreateCharacterDto })
  async create(
    @Request() req: JwtPayloadDto,
    @Body() data: CreateCharacterDto,
  ) {
    return await this.charactersService.create(data, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user characters' })
  async getAll(@Request() req: JwtPayloadDto) {
    // return await this.charactersService.getAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get character by ID' })
  @ApiParam({ name: 'id', description: 'Character ID' })
  async getOne(@Param('id', ValidMongoIdPipe) id: string) {
    return await this.charactersService.getOne(id);
  }
}
