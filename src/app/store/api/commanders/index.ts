import baseApi from '@app/store/api/base';
import { withQueryParams } from '@app/store/api/helpers';

import { Commander, GetCommanderParams, GetCommandersParams } from './types';

const commandersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCommanders: builder.query<Commander[], GetCommandersParams>({
      query: ({ dateAfter, sizeMin, sizeMax, topCut }) =>
        withQueryParams({
          url: '/commanders',
          params: { dateAfter, sizeMin, sizeMax, topCut },
        }),
    }),
    getCommander: builder.query<Commander | null, GetCommanderParams>({
      query: ({ name, dateAfter, sizeMin, sizeMax, topCut }) =>
        withQueryParams({
          url: `/commanders/${name}`,
          params: { dateAfter, sizeMin, sizeMax, topCut },
        }),
    }),
  }),
});

export default commandersApi;

export const { useGetCommandersQuery, useGetCommanderQuery } = commandersApi;

export const { getCommanders, getCommander } = commandersApi.endpoints;
