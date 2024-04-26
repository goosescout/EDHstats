import { FC } from 'react';

import clsx from 'clsx';
import { AppProps } from 'next/app';

import Layout from '~/app/components/Layout';

import * as fonts from '@/styles/font';

import '@/styles/global.scss';

const fontVariables = [
  fonts.sfProDisplayBold.variable,
  fonts.sfProDisplayMedium.variable,
  fonts.firaCode.variable,
  fonts.outfitLight.variable,
  fonts.outfitRegular.variable,
  fonts.outfitMedium.variable,
  fonts.outfitSemibold.variable,
  fonts.outfitBold.variable,
];

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div id="root" className={clsx(fontVariables)}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
};

export default App;
