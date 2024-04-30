import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

import { AverageStats } from './models/averageStats.model';

type GetAverageStatsParams = {
  dateAfter?: Date;
  sizeMin?: number;
  sizeMax?: number;
  topCut?: number;
};

@Injectable()
export class AnalyticsService {
  private logger = new Logger(AnalyticsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getAverageStats({
    dateAfter,
    sizeMin,
    sizeMax,
    topCut,
  }: GetAverageStatsParams): Promise<AverageStats> {
    const average = await this.prisma.deck.aggregate({
      where: {
        date: {
          gte: dateAfter,
        },
        tournament: {
          size: {
            gte: sizeMin,
            lte: sizeMax,
          },
        },
        place: {
          lte: topCut,
        },
      },
      _avg: {
        winrate: true,
        drawrate: true,
      },
    });

    return {
      winrate: average._avg.winrate ?? 0,
      drawrate: average._avg.drawrate ?? 0,
    };
  }
}
