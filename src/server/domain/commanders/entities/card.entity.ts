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
