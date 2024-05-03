import { FC, ReactNode } from 'react';

import Head from 'next/head';

import Footer from '@app/components/Footer';
import Navbar from '@app/components/Navbar';

type LayoutProps = {
  serverRenderTime?: number;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ serverRenderTime, children }) => {
  return (
    <>
      <Head>
        <title>EDHstats</title>
      </Head>

      <Navbar />

      {children}

      <Footer serverRenderTime={serverRenderTime} />
    </>
  );
};

export default Layout;
