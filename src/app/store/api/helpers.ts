import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { PORT, isServer } from '~/shared/constants/env';

export const BASE_URL = isServer ? `http://localhost:${PORT}/api/` : '/api/';

type SchemaT<Keys extends string, Args extends Record<Keys, unknown>> = {
  [k in Keys]?: (arg: Args[k]) => string;
};

export const withQueryParams = <
  Keys extends string,
  Args extends Partial<Record<Keys, unknown>> = Partial<Record<Keys, unknown>>,
>({
  url,
  params,
  schema = {},
}: {
  url: string;
  params: Args;
  schema?: SchemaT<Keys, Args>;
}): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      const fn = schema[key as Keys] ?? String;
      return `${key}=${fn(value as Args[Keys])}`;
    })
    .join('&');

  return `${url}?${query}`;
};

export const edhstatsBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  mode: 'cors',
});
