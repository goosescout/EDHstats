import baseApi from '@app/store/api/base';
import { withQueryParams } from '@app/store/api/helpers';

import {
  Commander,
  GetCommanderParams,
  GetCommandersParams,
  CommanderBrief,
} from './types';

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
          url: `/commanders/${encodeURIComponent(name)}`,
          params: { dateAfter, sizeMin, sizeMax, topCut },
        }),
    }),

    searchCommanders: builder.query<CommanderBrief[], string>({
      query: query =>
        withQueryParams({
          url: '/commanders/search',
          params: { query: encodeURIComponent(query) },
        }),
    }),

    getImages: builder.query<string[], string>({
      query: name => `/commanders/${encodeURIComponent(name)}/images`,
    }),
  }),
});

export default commandersApi;

export const {
  useGetCommandersQuery,
  useGetCommanderQuery,
  useSearchCommandersQuery,
  useGetImagesQuery,
} = commandersApi;

export const { getCommanders, getCommander, searchCommanders, getImages } =
  commandersApi.endpoints;
