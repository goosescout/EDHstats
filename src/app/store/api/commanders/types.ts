import { DateTime } from 'luxon';

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
  dateAfter?: DateTime;
  sizeMin?: number;
  sizeMax?: number;
  topCut?: number;
};

export type GetCommanderParams = GetCommandersParams & {
  name: string;
};
