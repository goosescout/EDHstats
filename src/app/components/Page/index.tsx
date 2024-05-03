import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Page.module.scss';

type PageProps = {
  className?: string;
  children?: ReactNode;
};

const Page: FC<PageProps> = ({ className, children }) => (
  <div className={styles.wrapper}>
    <main className={clsx(className, styles.page)}>{children}</main>
  </div>
);

export default Page;
