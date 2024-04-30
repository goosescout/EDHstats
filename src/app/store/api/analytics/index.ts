import baseApi from '@app/store/api/base';
import { withQueryParams } from '@app/store/api/helpers';

import { AverageStats, GetAverageStatsParams } from './types';

const analyticsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAverageStats: builder.query<AverageStats, GetAverageStatsParams>({
      query: ({ dateAfter, sizeMin, sizeMax, topCut }) =>
        withQueryParams({
          url: '/analytics/average-stats',
          params: { dateAfter, sizeMin, sizeMax, topCut },
        }),
    }),
  }),
});

export default analyticsApi;

export const { useGetAverageStatsQuery } = analyticsApi;

export const { getAverageStats } = analyticsApi.endpoints;
