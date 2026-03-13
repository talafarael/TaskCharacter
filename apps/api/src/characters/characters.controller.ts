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
import { JwtPayloadDto } from '../auth/dto/auth-user.dto';
import { CreateCharacterDto } from './dto/create.dto';
import { ValidMongoIdPipe } from '../common/pipes/valid-mongodb-id';

@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @Post()
  async create(
    @Request() req: JwtPayloadDto,
    @Body() data: CreateCharacterDto,
  ) {
    return await this.charactersService.create(data, req.user.id);
  }

  @Get()
  async getAll(@Request() req: JwtPayloadDto) {
    return this.charactersService.getAll(req.user.id);
  }

  @Get(':id')
  async getOne(
    @Param('id', ValidMongoIdPipe) id: string,
    @Request() req: JwtPayloadDto,
  ) {
    return this.charactersService.getOne(id, req.user.id);
  }
}
