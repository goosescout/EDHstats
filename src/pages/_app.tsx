import { FC, useEffect } from 'react';

import clsx from 'clsx';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '@app/components/Layout';
import { watchMedia } from '@app/store/external';
import { wrapper } from '@app/store/store';
import * as fonts from '@app/styles/font';

import '@app/styles/global.scss';

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

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    watchMedia(store);
  }, [store]);

  const pageProps = props.pageProps;

  return (
    <div id="root" className={clsx(fontVariables)}>
      <Provider store={store}>
        <Layout serverRenderTime={pageProps?.serverRenderTime}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );
};

export default App;
