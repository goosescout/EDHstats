export type Commander = {
  name: string;
  identity: string;
  winrate: number;
  drawrate: number;
  decks: number;
  autoincludes: number;
  unique: number;
  avgPrice: number;
};

export type GetCommandersParams = {
  dateAfter?: string | null;
  sizeMin?: number | null;
  sizeMax?: number | null;
  topCut?: number | null;
};

export type GetCommanderParams = GetCommandersParams & {
  name: string;
};
