import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

import { CommandersController } from './commanders.controller';
import { CommandersService } from './commanders.service';

@Module({
  imports: [ConfigModule],
  controllers: [CommandersController],
  providers: [PrismaService, CommandersService],
  exports: [CommandersService],
})
export class CommandersModule {}
