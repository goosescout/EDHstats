import { Action, PayloadAction } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { RootState } from '@app/store/store';

import { edhstatsBaseQuery } from './helpers';

const isHydrateAction = (
  action: Action,
): action is PayloadAction<RootState> => {
  return action.type === HYDRATE;
};

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: edhstatsBaseQuery,
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: () => ({}),
});

export default baseApi;
