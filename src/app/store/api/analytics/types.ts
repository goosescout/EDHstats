import { TournamentParams } from '@app/store/api/types';

export type GetAverageStatsParams = TournamentParams;

export type AverageStats = {
  winrate: number;
  drawrate: number;
};

export type GetCommanderStatsParams = TournamentParams & {
  name: string;
  included?: string[];
  excluded?: string[];
};

export type CommanderStats = {
  winrate: number;
  drawrate: number;
  decks: number;
};
