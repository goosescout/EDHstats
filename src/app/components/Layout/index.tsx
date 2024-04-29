import { FC, ReactNode } from 'react';

import Head from 'next/head';

import Footer from '@app/components/Footer';
import Navbar from '@app/components/Navbar';

import styles from './Layout.module.scss';

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

      <div className={styles.wrapper}>{children}</div>

      <Footer serverRenderTime={serverRenderTime} />
    </>
  );
};

export default Layout;
