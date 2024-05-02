import { Module } from '@nestjs/common';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

import { CommandersController } from './commanders.controller';
import { CommandersService } from './commanders.service';

@Module({
  controllers: [CommandersController],
  providers: [PrismaService, CommandersService],
  exports: [CommandersService],
})
export class CommandersModule {}
