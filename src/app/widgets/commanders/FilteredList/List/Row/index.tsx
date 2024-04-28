import { FC, ReactNode } from 'react';

import { Column } from '@/components/Table/types';

import styles from './Row.module.scss';

type RowProps = {
  columns: Column[];
  children: ReactNode;
};

const Row: FC<RowProps> = ({ columns, children }) => (
  <div
    className={styles.row}
    style={{
      gridTemplateColumns: columns
        .map(({ width }) => (width === 'fill' ? '1fr' : `${width}px`))
        .join(' '),
    }}
  >
    {children}
  </div>
);

export default Row;
