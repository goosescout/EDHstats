import { GetServerSidePropsContext } from 'next';

import { BasePageProps } from './types';

const parseBaseContext = (
  context: GetServerSidePropsContext,
): BasePageProps => {
  return {
    serverRenderTime:
      Math.round(context.res.getHeader('x-render-time') as number) / 1000,
  };
};

export default parseBaseContext;
