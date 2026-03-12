import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { JwtPayloadDto } from '../auth/dto/auth-user.dto';

@Controller('users')
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: JwtPayloadDto) { }
}
