import { ReactNode, useMemo } from 'react';

import clsx from 'clsx';
import isEqual from 'lodash/isEqual';
import { DateTime } from 'luxon';

import { useAppSelector } from '~/app/store';
import useDebouncedCallback from '~/app/utils/hooks/useDebounce';

import Separator from '@app/components/Separator';
import Table from '@app/components/Table';
import { useGetCommandersQuery } from '@app/store/api/commanders';
import { Column } from '@app/widgets/commanders/FilteredList/List/types';

import useSortedColumns from './hooks/useSortedColumns';

import styles from './List.module.scss';
import ManaContainer from './ManaContainer';
import Row from './Row';

const initialColumns: Column[] = [
  { name: '#', key: 'number', width: 40, sort: null },
  { name: 'Commander', key: 'name', width: 'fill', sort: null },
  { name: 'Colors', key: 'identity', width: 124, sort: null },
  { name: 'Winrate', key: 'winrate', width: 68, sort: 'none' },
  { name: 'Decks', key: 'decks', width: 52, sort: 'none' },
  { name: 'Autoincludes', key: 'autoincludes', width: 84, sort: 'none' },
  { name: 'Unique', key: 'unique', width: 60, sort: 'none' },
  { name: 'Price', key: 'avgPrice', width: 108, sort: 'none' },
];

const AVG_WINRATE = 0.25;

const List = () => {
  const { search, mana, winrate, decks, uniqueCards, dateAfter, size, topCut } =
    useAppSelector(({ filters }) => filters);

  const { columns, sortColumn, handleSort } = useSortedColumns(initialColumns);

  const getCommandersParams = useMemo(
    () => ({
      dateAfter: DateTime.fromSeconds(dateAfter).toISODate(),
      sizeMin: size[0] ? Number(size[0]) : null,
      sizeMax: size[1] ? Number(size[1]) : null,
      topCut: topCut ? Number(topCut) : null,
    }),
    [dateAfter, size, topCut],
  );

  const debouncedParams = useDebouncedCallback(getCommandersParams, 800);

  const { data, isFetching } = useGetCommandersQuery(debouncedParams);

  const filteredData = useMemo(() => {
    if (!data) return null;

    return data
      .filter(commander => {
        if (mana.length > 0 && !isEqual(mana, commander.identity.split('')))
          return false;

        const winrateMin = Number(winrate[0]) / 100;
        const winrateMax = winrate[1] ? Number(winrate[1]) / 100 : 1;
        if (commander.winrate < winrateMin || commander.winrate > winrateMax)
          return false;

        const decksMin = Number(decks[0]);
        const decksMax = decks[1] ? Number(decks[1]) : Infinity;
        if (commander.decks < decksMin || commander.decks > decksMax)
          return false;

        const uniqueMin = Number(uniqueCards[0]);
        const uniqueMax = uniqueCards[1] ? Number(uniqueCards[1]) : Infinity;
        if (commander.unique < uniqueMin || commander.unique > uniqueMax)
          return false;

        if (
          search &&
          !commander.name.toLowerCase().includes(search.toLowerCase())
        )
          return false;

        return true;
      })
      .toSorted((a, b) => {
        if (sortColumn.order === 'asc') {
          return a[sortColumn.key] - b[sortColumn.key];
        }

        return b[sortColumn.key] - a[sortColumn.key];
      });
  }, [data, decks, mana, search, sortColumn, uniqueCards, winrate]);

  const rows = useMemo(
    () =>
      filteredData?.map((commander, index) => (
        <Row columns={columns} key={index}>
          <span key={`${columns[0].key}_${index}`}>{index + 1}</span>
          <WithTableDivider>
            <div
              className={styles['name-column']}
              key={`${columns[1].key}_${index}`}
            >
              {commander.name}
            </div>
          </WithTableDivider>
          <WithTableDivider>
            <ManaContainer key={`${columns[2].key}_${index}`}>
              {commander.identity}
            </ManaContainer>
          </WithTableDivider>
          <WithTableDivider>
            <div
              className={styles['winrate-column']}
              key={`${columns[3].key}_${index}`}
              data-positive={commander.winrate > AVG_WINRATE}
            >
              {Math.round(commander.winrate * 100)}%
            </div>
          </WithTableDivider>
          <WithTableDivider>
            <span key={`${columns[4].key}_${index}`}>{commander.decks}</span>
          </WithTableDivider>
          <WithTableDivider>
            <span key={`${columns[5].key}_${index}`}>
              {commander.autoincludes}
            </span>
          </WithTableDivider>
          <WithTableDivider>
            <span key={`${columns[6].key}_${index}`}>{commander.unique}</span>
          </WithTableDivider>
          <WithTableDivider>
            <span key={`${columns[7].key}_${index}`}>
              ${commander.avgPrice.toFixed(2)}
            </span>
          </WithTableDivider>
        </Row>
      )) ?? [],
    [columns, filteredData],
  );

  return (
    <Table
      className={clsx(styles.table, isFetching && styles.loading)}
      columns={columns}
      onSort={handleSort}
      emptyMessage="No commanders were found. Try changing the filters."
    >
      {rows}
    </Table>
  );
};

const WithTableDivider = ({ children }: { children: ReactNode }) => (
  <div className={styles['separator-wrapper']}>
    <Separator />
    {children}
  </div>
);

export default List;
