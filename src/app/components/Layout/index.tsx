import { FC, ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import styles from './Layout.module.scss';

type LayoutProps = {
  serverRenderTime?: number;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ serverRenderTime, children }) => {
  return (
    <>
      <Navbar />

      <div className={styles.wrapper}>{children}</div>

      <Footer serverRenderTime={serverRenderTime} />
    </>
  );
};

export default Layout;
