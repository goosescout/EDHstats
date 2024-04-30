import { Player } from './player.entity';

export type Tournament = {
  TID: string;
  tournamentName: string;
  swissRounds: number;
  topCut: number;
  dateCreated: number;
  standings: Player[];
};
