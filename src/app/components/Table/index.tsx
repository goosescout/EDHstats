import { useRef, ReactNode } from 'react';

import { ViewportList, ViewportListRef } from 'react-viewport-list';

import SortOrderSelector from './SortOrderSelector';
import styles from './Table.module.scss';
import { Column } from './types';

type TableProps = {
  columns: Column[];
  showHeader?: boolean;
  onSort?: (name: string, state: 'asc' | 'desc' | 'none') => void;
  className?: string;
  children: ReactNode[];
  emptyMessage?: string;
};

const Table = ({
  columns,
  showHeader = true,
  onSort,
  className = '',
  children,
  emptyMessage,
}: TableProps) => {
  const listRef = useRef<ViewportListRef>(null);

  const getOnClick = (name: string) => (state: 'asc' | 'desc' | 'none') => {
    onSort?.(name, state);
  };

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
          {columns.map(({ name, key, sort }) => (
            <SortOrderSelector
              key={key}
              state={sort}
              name={name}
              onClick={getOnClick(key)}
            />
          ))}
        </div>
      )}

      <div className={styles['list-wrapper']}>
        {children.length ? (
          <ViewportList
            items={children}
            itemMargin={10}
            initialPrerender={15}
            overscan={15}
            ref={listRef}
          >
            {item => item}
          </ViewportList>
        ) : (
          <span className={styles.empty}>{emptyMessage}</span>
        )}
      </div>
    </div>
  );
};

export default Table;
