import { useState, useMemo } from 'react';

import { Column } from '@app/widgets/commanders/FilteredList/List/types';

const useSortedColumns = (initialColumns: Column[]) => {
  const [sortColumn, setSortColumn] = useState<{
    key: string;
    order: 'asc' | 'desc';
  }>({
    key: 'winrate',
    order: 'desc',
  });

  const columns = useMemo(
    () =>
      initialColumns.map(column => {
        if (column.key === sortColumn.key) {
          return {
            ...column,
            sort: sortColumn.order,
          };
        }

        return column;
      }),
    [initialColumns, sortColumn],
  );

  const handleSort = (key: string, state: 'asc' | 'desc' | 'none') => {
    if (state === 'none') return;

    setSortColumn({
      key,
      order: state,
    });
  };

  return { columns, sortColumn, handleSort };
};

export default useSortedColumns;
