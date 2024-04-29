import { Injectable } from '@nestjs/common';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

@Injectable()
export class CommandersService {
  constructor(private prisma: PrismaService) {}

  async getCommanders() {
    return await this.prisma.commander.findMany();
  }
}
