export type Player = {
  decklist: string | null;
  wins: number;
  draws: number;
  losses: number;
};

export type Tournament = {
  TID: string;
  tournamentName: string;
  swissRounds: number;
  topCut: number;
  dateCreated: number;
  standings: Player[];
};

export type Card = {
  boardType: string;
  card: {
    mana_cost: string;
    color_identity: Array<'W' | 'U' | 'B' | 'R' | 'G'>;
    card_faces: Array<{
      mana_cost: string;
      name: string;
    }>;
    prices: {
      usd?: number;
      usd_foil?: number;
    };
  };
};

export type Decklist = {
  id: string;
  format: string;
  commanders: {
    [name: string]: Card;
  };
  mainboard: {
    [name: string]: Card;
  };
};
