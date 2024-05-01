import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mean from 'lodash/mean';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

import { AverageStats } from './models/averageStats.model';
import { Card as CardModel } from './models/card.model';
import { CommanderStats as CommanderStatsModel } from './models/commanderStats.model';

type TournamentFilter = {
  dateAfter?: Date;
  sizeMin?: number;
  sizeMax?: number;
  topCut?: number;
};

type GetAverageStatsParams = TournamentFilter;

type GetCardsParams = TournamentFilter & {
  name: string;
};

type GetCommanderStatsParams = TournamentFilter & {
  name: string;
  included: string[];
  excluded: string[];
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

  async getCards({
    name,
    dateAfter,
    sizeMin,
    sizeMax,
    topCut,
  }: GetCardsParams): Promise<CardModel[]> {
    const cards = await this.prisma.card.findMany({
      where: {
        decks: {
          some: {
            commander: {
              name,
            },
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
        },
      },
    });

    const totalDecks = await this.prisma.deck.count({
      where: {
        commander: {
          name,
        },
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
    });

    return await Promise.all(
      cards.map(async card => {
        const stats = await this.prisma.deck.aggregate({
          where: {
            commander: {
              name,
            },
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
            cards: {
              some: {
                name: card.name,
              },
            },
          },
          _avg: {
            winrate: true,
          },
          _count: {
            id: true,
          },
        });

        return {
          ...card,
          winrate: stats._avg.winrate ?? 0,
          inclusionRate: stats._count.id / totalDecks,
        };
      }),
    );
  }

  async getCommanderStats({
    name,
    dateAfter,
    sizeMin,
    sizeMax,
    topCut,
    included,
    excluded,
  }: GetCommanderStatsParams): Promise<CommanderStatsModel> {
    const decks = await this.prisma.deck.findMany({
      where: {
        commander: {
          name,
        },
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
        cards: {
          every: {
            name: {
              notIn: excluded,
            },
          },
        },
      },
      include: {
        cards: true,
      },
    });

    const filteredDecks = decks.filter(deck => {
      const includedCards = deck.cards.filter(card =>
        included.includes(card.name),
      );

      return includedCards.length === included.length;
    });

    if (filteredDecks.length === 0) {
      return {
        winrate: 0,
        drawrate: 0,
        decks: 0,
      };
    }

    return {
      winrate: mean(filteredDecks.map(deck => deck.winrate)),
      drawrate: mean(filteredDecks.map(deck => deck.drawrate)),
      decks: filteredDecks.length,
    };
  }
}
