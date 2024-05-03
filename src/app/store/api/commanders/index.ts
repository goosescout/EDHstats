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

    getCommander: builder.query<Commander, GetCommanderParams>({
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

    getFavorites: builder.query<string[], void>({
      query: () => '/commanders/favorite',
      transformResponse: (response: CommanderBrief[]) =>
        response.map(c => c.name),
    }),

    toggleFavorite: builder.mutation<void, string>({
      query: name => ({
        url: `/commanders/${encodeURIComponent(name)}/favorite`,
        method: 'POST',
      }),

      async onQueryStarted(name, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          commandersApi.util.updateQueryData(
            'getFavorites',
            undefined,
            draft => {
              const commander = draft.find(
                commanderName => commanderName === name,
              );

              if (commander) draft.splice(draft.indexOf(commander), 1);
              else draft.push(name);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export default commandersApi;

export const {
  useGetCommandersQuery,
  useGetCommanderQuery,
  useSearchCommandersQuery,
  useGetImagesQuery,
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} = commandersApi;

export const {
  getCommanders,
  getCommander,
  searchCommanders,
  getImages,
  getFavorites,
} = commandersApi.endpoints;
