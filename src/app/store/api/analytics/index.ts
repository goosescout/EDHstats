import baseApi from '@app/store/api/base';
import { withQueryParams } from '@app/store/api/helpers';

import {
  AverageStats,
  CommanderStats,
  GetAverageStatsParams,
  GetCommanderStatsParams,
} from './types';

const analyticsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAverageStats: builder.query<AverageStats, GetAverageStatsParams>({
      query: ({ dateAfter, sizeMin, sizeMax, topCut }) =>
        withQueryParams({
          url: '/analytics/average-stats',
          params: { dateAfter, sizeMin, sizeMax, topCut },
        }),
    }),

    getCommanderStats: builder.query<CommanderStats, GetCommanderStatsParams>({
      query: ({
        name,
        dateAfter,
        sizeMin,
        sizeMax,
        topCut,
        included,
        excluded,
      }) => ({
        url: withQueryParams({
          url: `/analytics/${encodeURIComponent(name)}`,
          params: { dateAfter, sizeMin, sizeMax, topCut },
        }),
        method: 'POST',
        body: { included: included ?? [], excluded: excluded ?? [] },
      }),
    }),
  }),
});

export default analyticsApi;

export const { useGetAverageStatsQuery, useGetCommanderStatsQuery } =
  analyticsApi;

export const { getAverageStats, getCommanderStats } = analyticsApi.endpoints;
