import { GetServerSidePropsContext } from 'next';

import { TIMING_HEADER } from '~/shared/constants';

import { setUser } from '@app/store/slices/common';

import parseToken from './parseToken';
import { BasePageProps } from './types';

const parseBaseContext = async (
  context: GetServerSidePropsContext,
  store: any,
): Promise<BasePageProps> => {
  const token = context.req.cookies.token;
  if (token) {
    const { username, sub } = token
      ? parseToken(token)
      : { username: null, sub: null };
    await store.dispatch(setUser({ username, id: sub }));
  }

  return {
    serverRenderTime:
      Math.round(context.res.getHeader(TIMING_HEADER) as number) / 1000,
  };
};

export default parseBaseContext;
