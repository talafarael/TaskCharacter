import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { RegisterDto, LoginDto, AuthUserDto } from './dto';

@Controller('auth')
@Throttle({ default: { ttl: 60_000, limit: 5 } })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() _: LoginDto, @Request() req: { user: AuthUserDto }) {
    return this.authService.login(req.user);
  }
}
