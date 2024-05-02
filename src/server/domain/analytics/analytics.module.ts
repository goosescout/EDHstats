import { Module } from '@nestjs/common';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  controllers: [AnalyticsController],
  providers: [PrismaService, AnalyticsService],
  exports: [],
})
export class AnalyticsModule {}
