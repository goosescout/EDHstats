import { GetServerSidePropsContext } from 'next';

import { TIMING_HEADER } from '~/shared/constants';

import { setUser } from '@app/store/slices/common';

import parseServerToken from './parseServerToken';
import { BasePageProps } from './types';

const parseBaseContext = async (
  context: GetServerSidePropsContext,
  store: any,
): Promise<BasePageProps> => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const { username, sub } = token
      ? parseServerToken(token)
      : { username: null, sub: null };
    await store.dispatch(setUser({ username, id: sub }));
  }

  return {
    serverRenderTime:
      Math.round(context.res.getHeader(TIMING_HEADER) as number) / 1000,
  };
};

export default parseBaseContext;
