import { GetServerSidePropsContext } from 'next';

import { TIMING_HEADER } from '~/shared/constants';

import { BasePageProps } from './types';

const parseBaseContext = (
  context: GetServerSidePropsContext,
): BasePageProps => {
  return {
    serverRenderTime:
      Math.round(context.res.getHeader(TIMING_HEADER) as number) / 1000,
  };
};

export default parseBaseContext;
