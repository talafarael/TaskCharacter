import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repositories';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getProfile(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
