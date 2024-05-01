import { FC, ReactNode } from 'react';

import { Column } from '@app/components/Table/types';

import styles from './Row.module.scss';

type RowProps = {
  columns: Column[];
  onClick?: () => void;
  children: ReactNode;
};

const Row: FC<RowProps> = ({ columns, onClick, children }) => (
  <div
    onClick={onClick}
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
