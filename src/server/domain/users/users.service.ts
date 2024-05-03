import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, password: string): Promise<User> {
    const user = await this.getUserByUsername(username);
    if (user) throw new Error('User already exists');

    return await this.prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}
