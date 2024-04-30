import { ManaT } from '@app/utils/types';

export type FiltersSlice = {
  // Commander-specific filters
  search: string;
  mana: ManaT[];
  winrate: [string, string];
  decks: [string, string];
  autoincludes: [string, string];
  uniqueCards: [string, string];

  // Tournament-specific filters
  dateAfter: number; // timestamp
  size: [string, string];
  topCut: string;
};
