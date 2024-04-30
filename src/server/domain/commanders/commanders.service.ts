import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Card, Commander } from '@prisma/client';

import { getIdentity } from '~/shared/helpers/getIdentity';
import { mergeIdentities } from '~/shared/helpers/mergeIdentities';

import { PrismaService } from '@server/infrastructure/database/prisma.service';

import { Decklist } from './entities/decklist.entity';
import { Player } from './entities/player.entity';
import { Tournament } from './entities/tournament.entity';

const MOXFIELD_DECKLIST_URL = 'https://www.moxfield.com/decks/';
const SLICE_LENGTH = MOXFIELD_DECKLIST_URL.length;

@Injectable()
export class CommandersService {
  private logger = new Logger(CommandersService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getCommanders() {
    return await this.prisma.commander.findMany();
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

    if (!decklistLink || !decklistLink.startsWith(MOXFIELD_DECKLIST_URL))
      return;

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

    const { commanders, cards, price } = this.getCards(decklist);
    const arePartners = commanders.length > 1;

    const commandersName = arePartners
      ? `${commanders[0].name} // ${commanders[1].name}`
      : commanders[0].name;

    const identity = arePartners
      ? mergeIdentities(commanders[0].identity, commanders[1].identity)
      : getIdentity(commanders[0].identity);

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
        price,
        cards: {
          connect: cards,
        },
      },
    });
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
