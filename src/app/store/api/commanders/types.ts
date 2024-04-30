import { TournamentParams } from '@app/store/api/types';

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

export type GetCommandersParams = TournamentParams;

export type GetCommanderParams = GetCommandersParams & {
  name: string;
};
