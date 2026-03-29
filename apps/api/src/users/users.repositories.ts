import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { Cached } from '../redis/decorators/redis.decorator';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) { }

  @Cached('users', 'id')
  async findOneById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  @Cached('users', 'email')
  async findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async create(data: { email: string; password: string }): Promise<User> {
    return this.prismaService.user.create({ data });
  }
}
