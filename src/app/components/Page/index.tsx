import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Page.module.scss';

type PageProps = {
  className?: string;
  children?: ReactNode;
};

const Page: FC<PageProps> = ({ className, children }) => (
  <main className={clsx(className, styles.page)}>{children}</main>
);

export default Page;
