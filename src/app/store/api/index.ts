import baseApi from '@app/store/api/base';

const reducers = {
  [baseApi.reducerPath]: baseApi.reducer,
};

export const middlewares = [baseApi.middleware] as const;

export default reducers;
