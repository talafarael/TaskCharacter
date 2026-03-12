import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: string): Promise<Omit<User, 'password'> | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async create(data: { email: string; password: string }): Promise<User> {
    return this.prismaService.user.create({ data });
  }
}
