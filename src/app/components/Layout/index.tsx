import { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import styles from './styles.module.scss';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />

      <div className={styles['page-wrapper']}>{children}</div>

      <Footer />
    </>
  );
}
