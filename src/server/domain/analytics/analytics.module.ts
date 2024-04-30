import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [ConfigModule],
  controllers: [AnalyticsController],
  providers: [PrismaService, AnalyticsService],
  exports: [],
})
export class AnalyticsModule {}
