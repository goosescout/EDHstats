import { TournamentParams } from '@app/store/api/types';

export type GetAverageStatsParams = TournamentParams;

export type AverageStats = {
  winrate: number;
  drawrate: number;
};
