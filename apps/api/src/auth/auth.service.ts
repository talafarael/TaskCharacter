import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repositories';
import { AuthUserDto } from './dto';

const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) return null;
    const passWordValid = await bcrypt.compare(password, user.password);
    if (passWordValid) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthUserDto) {
    return this.createToken(user.id, user.email);
  }

  async register(email: string, password: string) {
    const existing = await this.usersRepository.findOneByEmail(email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });
    return this.createToken(user.id, user.email);
  }

  async createToken(id: string, email: string) {
    const payload = { sub: id, email: email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
