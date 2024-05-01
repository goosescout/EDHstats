import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Card, Commander } from '@prisma/client';
import mean from 'lodash/mean';

import { getIdentity } from '~/shared/helpers/getIdentity';
import { mergeIdentities } from '~/shared/helpers/mergeIdentities';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

import { Decklist } from './entities/decklist.entity';
import { Player } from './entities/player.entity';
import { Tournament } from './entities/tournament.entity';
import { Commander as CommanderModel } from './models/commander.model';
import { CommanderBrief as CommanderBriefModel } from './models/commanderBrief.model';

const MOXFIELD_DECKLIST_URL = 'https://www.moxfield.com/decks/';
const SLICE_LENGTH = MOXFIELD_DECKLIST_URL.length;

type GetCommandersParams = {
  dateAfter?: Date;
  sizeMin?: number;
  sizeMax?: number;
  topCut?: number;
};

type GetCommanderParams = GetCommandersParams & {
  name: string;
};

type GetCommanderStatsParams = GetCommandersParams & {
  commander: Commander;
};

@Injectable()
export class CommandersService {
  private logger = new Logger(CommandersService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getCommanders({
    dateAfter,
    sizeMin,
    sizeMax,
    topCut,
  }: GetCommandersParams): Promise<CommanderModel[]> {
    const commanders = await this.prisma.commander.findMany({
      where: {
        decks: {
          some: {
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

    return await Promise.all(
      commanders.map(
        async commander =>
          await this.getCommanderStats({
            commander,
            dateAfter,
            sizeMin,
            sizeMax,
            topCut,
          }),
      ),
    );
  }

  async getCommander({
    dateAfter,
    sizeMin,
    sizeMax,
    topCut,
    name,
  }: GetCommanderParams): Promise<CommanderModel | null> {
    const commander = await this.prisma.commander.findUnique({
      where: {
        name,
      },
    });

    if (!commander) return null;

    return await this.getCommanderStats({
      dateAfter,
      sizeMin,
      sizeMax,
      topCut,
      commander,
    });
  }

  private async getCommanderStats({
    dateAfter,
    sizeMin,
    sizeMax,
    topCut,
    commander,
  }: GetCommanderStatsParams): Promise<CommanderModel> {
    const decks = await this.prisma.deck.findMany({
      where: {
        commanderName: commander.name,
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
      include: {
        cards: {
          select: {
            name: true,
          },
        },
      },
    });

    const decksCount = decks.length;

    const { cards, winrates, drawrates, prices } = decks.reduce(
      (acc, deck) => {
        deck.cards.forEach(card =>
          acc.cards.set(card.name, (acc.cards.get(card.name) ?? 0) + 1),
        );
        acc.winrates.push(deck.winrate);
        acc.drawrates.push(deck.drawrate);
        acc.prices.push(deck.price);
        return acc;
      },
      {
        cards: new Map<string, number>(),
        winrates: [] as number[],
        drawrates: [] as number[],
        prices: [] as number[],
      },
    );

    let autoincludes = 0;
    for (const count of cards.values()) {
      if (count >= decksCount * 0.9) autoincludes++;
    }

    return {
      ...commander,
      autoincludes,
      unique: cards.size,
      avgPrice: prices.length ? mean(prices) : 0,
      winrate: winrates.length ? mean(winrates) : 0,
      drawrate: drawrates.length ? mean(drawrates) : 0,
      decks: decksCount,
    };
  }

  async searchCommanders(query: string): Promise<CommanderBriefModel[]> {
    const commanders = await this.prisma.commander.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        name: true,
        identity: true,
      },
      orderBy: {
        decks: {
          _count: 'desc',
        },
      },
    });

    return commanders;
  }

  async getCommanderImages(name: string): Promise<string[] | null> {
    const commander = await this.prisma.commander.findUnique({
      where: {
        name,
      },
    });

    if (!commander) return null;

    if (commander.name.includes(' // ')) {
      // Partners or double-faced commander
      const partners = commander.name.split(' // ');
      const images = await Promise.all(
        partners.map(partner => this.fetchCommanderImage(partner)),
      );
      if (!images[0] || !images[1]) return null;
      if (images[0].length !== 1) return images[0]; // Double-faced commander
      return [images[0][0], images[1][0]];
    } else {
      // Normal commander
      const images = await this.fetchCommanderImage(commander.name);
      return images;
    }
  }

  private async fetchCommanderImage(name: string): Promise<string[] | null> {
    const response = await fetch(
      `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`,
    );
    if (!response.ok) return null;

    const card = await response.json();
    if ('card_faces' in card)
      return card.card_faces.map(face => face.image_uris.normal);

    return [card.image_uris.normal];
  }

  /**
   * Fetches tournaments from the last `last` days and processes them.
   * The function directly creates new commanders, cards and decks in the database.
   *
   * @param last Number of days to fetch tournaments from
   */
  async fetchNewCommanders(last: number) {
    this.logger.log(`Fetching tournaments for the last ${last} days...`);
    const tournaments = await this.fetchTorunaments(last);

    const tournamentsCount = tournaments.length;

    for (let i = 0; i < tournamentsCount; i++) {
      await this.processTournament(tournaments[i], i + 1, tournamentsCount);
    }
  }

  private async processTournament(
    tournament: Tournament,
    current: number,
    total: number,
  ) {
    const existingTournament = await this.prisma.tournament.findUnique({
      where: {
        id: tournament.TID,
      },
    });
    if (existingTournament) {
      this.logger.log(`Skipping existing tournament ${tournament.TID}`);
      return;
    }

    this.logger.log(
      `Processing tournament ${tournament.TID} (${current}/${total})...`,
    );

    const date = new Date(tournament.dateCreated * 1000);
    const playersCount = tournament.standings.length;

    await this.prisma.tournament.create({
      data: {
        id: tournament.TID,
        size: playersCount,
      },
    });

    for (let i = 0; i < playersCount; i++)
      await this.processPlayer(
        tournament.standings[i],
        tournament.TID,
        date,
        i + 1,
        playersCount,
      );
  }

  private async processPlayer(
    player: Player,
    tournamentId: string,
    date: Date,
    current: number,
    total: number,
  ) {
    const decklistLink = player.decklist;

    if (!decklistLink?.startsWith(MOXFIELD_DECKLIST_URL)) return;

    this.logger.log(
      `Processing decklist ${decklistLink} (${current}/${total})...`,
    );

    const decklist = await this.fetchDecklist(decklistLink);

    if (!decklist) {
      this.logger.error(`Failed to fetch decklist ${decklistLink}`);
      return;
    }

    const existingDeck = await this.prisma.deck.findUnique({
      where: {
        id: decklist.id,
      },
    });
    if (existingDeck) {
      this.logger.log(
        `Skipping existing deck ${decklistLink} with id ${decklist.id}`,
      );
      return;
    }

    if (decklist.format !== 'commander') {
      this.logger.warn(`Skipping non-commander decklist ${decklistLink}`);
      return;
    }

    try {
      const { commanders, cards, price } = this.getCards(decklist);
      const arePartners = commanders.length > 1;

      const commandersName = arePartners
        ? `${commanders[0].name} // ${commanders[1].name}`
        : commanders[0].name;

      const identity = arePartners
        ? mergeIdentities(commanders[0].identity, commanders[1].identity)
        : getIdentity(commanders[0].identity);

      const totalGames = player.wins + player.draws + player.losses || 1;
      const winrate = player.wins / totalGames;
      const drawrate = player.draws / totalGames;

      await this.prisma.commander.createMany({
        data: [
          {
            name: commandersName,
            identity,
          },
        ],
        skipDuplicates: true,
      });

      await this.prisma.card.createMany({
        data: cards,
        skipDuplicates: true,
      });

      await this.prisma.deck.create({
        data: {
          id: decklist.id,
          tournamentId,
          commanderName: commandersName,
          date,
          wins: player.wins,
          draws: player.draws,
          losses: player.losses,
          place: current,
          winrate,
          drawrate,
          price,
          cards: {
            connect: cards,
          },
        },
      });
    } catch (error) {
      this.logger.error(`Failed to process decklist ${decklistLink}`);
      this.logger.error(error);
    }
  }

  private getCards(decklist: Decklist): {
    commanders: Commander[];
    cards: Card[];
    price: number;
  } {
    let price = 0;
    const commanders: Commander[] = [];
    const cards: Card[] = [];

    for (const cardName in decklist.commanders) {
      const card = decklist.commanders[cardName].card;

      commanders.push({
        name: cardName,
        identity: card.color_identity.join(''),
      });
      price += card.prices.usd ?? card.prices.usd_foil ?? 0;
    }

    for (const cardName in decklist.mainboard) {
      const card = decklist.mainboard[cardName].card;

      let manacost = 'unknown';
      if (card.mana_cost !== undefined) manacost = card.mana_cost;
      else if (card.card_faces.length === 2)
        manacost = `${card.card_faces[0].mana_cost} // ${card.card_faces[1].mana_cost}`;

      cards.push({
        manacost,
        name: cardName,
      });
      price += card.prices.usd ?? card.prices.usd_foil ?? 0;
    }

    return { commanders, cards, price };
  }

  private async fetchTorunaments(last: number) {
    const response = await fetch('https://topdeck.gg/api', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':
          this.configService.get<string>('EMINENCE_API_KEY') ?? '',
      },
      body: JSON.stringify({
        last: last,
        columns: ['decklist', 'wins', 'draws', 'losses'],
      }),
    });
    if (!response.ok) return [];

    const tournaments: Tournament[] = await response.json();

    return tournaments;
  }

  private async fetchDecklist(decklistLink: string) {
    const response = await fetch(
      `https://api.moxfield.com/v2/decks/all/${decklistLink.slice(SLICE_LENGTH)}`,
    );
    if (!response.ok) return null;

    const decklist: Decklist = await response.json();

    return decklist;
  }
}
