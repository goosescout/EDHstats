import { useRef, ReactNode } from 'react';

import clsx from 'clsx';
import { ViewportList, ViewportListRef } from 'react-viewport-list';

import SortOrderSelector from './SortOrderSelector';
import styles from './Table.module.scss';
import { Column } from './types';

type TableProps = {
  columns: Column[];
  showHeader?: boolean;
  className?: string;
  children: ReactNode[];
};

export default function Table({
  columns,
  showHeader = true,
  className = '',
  children,
}: TableProps) {
  const listRef = useRef<ViewportListRef>(null);

  return (
    <div className={className}>
      {showHeader && (
        <div
          className={styles.header}
          style={{
            gridTemplateColumns: columns
              .map(({ width }) => (width === 'fill' ? '1fr' : `${width}px`))
              .join(' '),
          }}
        >
          {columns.map(({ name, sort }) => (
            <SortOrderSelector
              key={name}
              state={sort}
              name={name}
              onClick={() => {}}
            />
          ))}
        </div>
      )}

      <div className={styles['list-wrapper']}>
        <ViewportList
          items={children}
          itemMargin={10}
          overscan={25}
          ref={listRef}
        >
          {item => item}
        </ViewportList>
      </div>
    </div>
  );
}
