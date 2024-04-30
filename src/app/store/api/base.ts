import { createApi } from '@reduxjs/toolkit/query/react';

import { edhstatsBaseQuery } from './helpers';

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: edhstatsBaseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

export default baseApi;
