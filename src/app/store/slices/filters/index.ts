import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import { FiltersSlice } from '@app/store/slices/filters/types';
import { ManaT } from '@app/utils/types';

const COLORS: ManaT[] = ['W', 'U', 'B', 'R', 'G', 'C'];

const initialState: FiltersSlice = {
  search: '',
  mana: [],
  winrate: ['0', '100'],
  decks: ['1', ''],
  autoincludes: ['0', ''],
  uniqueCards: ['0', ''],
  dateAfter: DateTime.local().minus({ years: 1 }).toSeconds(),
  size: ['4', ''],
  topCut: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },

    setMana: (state, { payload }: PayloadAction<ManaT[]>) => {
      const result: ManaT[] = [];
      for (const color of COLORS)
        if (payload.includes(color)) result.push(color);
      state.mana = result;
    },

    setWinrate: (state, { payload }: PayloadAction<[string, string]>) => {
      state.winrate = payload;
    },

    setDecks: (state, { payload }: PayloadAction<[string, string]>) => {
      state.decks = payload;
    },

    setAutoincludes: (state, { payload }: PayloadAction<[string, string]>) => {
      state.autoincludes = payload;
    },

    setUniqueCards: (state, { payload }: PayloadAction<[string, string]>) => {
      state.uniqueCards = payload;
    },

    setTournamentDateAfter: (state, { payload }: PayloadAction<number>) => {
      state.dateAfter = payload;
    },

    setTournamentSize: (
      state,
      { payload }: PayloadAction<[string, string]>,
    ) => {
      state.size = payload;
    },

    setTopCut: (state, { payload }: PayloadAction<string>) => {
      state.topCut = payload;
    },

    clearFilters: () => initialState,
  },
});

export const {
  setSearch,
  setMana,
  setWinrate,
  setDecks,
  setAutoincludes,
  setUniqueCards,
  setTournamentDateAfter,
  setTournamentSize,
  setTopCut,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
