import { ReactNode, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import isEqual from 'lodash/isEqual';
import { useRouter } from 'next/router';

import Separator from '@app/components/Separator';
import Table from '@app/components/Table';
import { useAppSelector } from '@app/store';
import { useGetAverageStatsQuery } from '@app/store/api/analytics';
import {
  useGetCommandersQuery,
  useGetFavoritesQuery,
} from '@app/store/api/commanders';
import { Commander } from '@app/store/api/commanders/types';
import useTournamentFilters from '@app/utils/hooks/useTournamentFilters';
import { Column } from '@app/widgets/commanders/FilteredList/List/types';

import useSortedColumns from './hooks/useSortedColumns';

import FavoritesToggle from './FavoriteToggle';
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
  { name: 'Price', key: 'avgPrice', width: 128, sort: 'none' },
];

const List = () => {
  const router = useRouter();

  const { search, favoritesOnly, mana, winrate, decks, uniqueCards } =
    useAppSelector(({ filters }) => filters);
  const isLoggedIn = useAppSelector(({ common }) => common.id !== null);

  const { columns, sortColumn, handleSort } = useSortedColumns(initialColumns);

  const debouncedParams = useTournamentFilters();

  const {
    data: averageStats,
    isLoading: isAverageLoading,
    isFetching: isAverageFetching,
  } = useGetAverageStatsQuery(debouncedParams);
  const { data: favorites } = useGetFavoritesQuery(undefined, {
    skip: !isLoggedIn,
  });
  const {
    data: commanders,
    isFetching: isCommandersFetching,
    isLoading: isCommandersLoading,
  } = useGetCommandersQuery(debouncedParams);

  const getHandleRowClick = useCallback(
    (commander: Commander) => () =>
      router.push(`/card-choices/${encodeURIComponent(commander.name)}`),
    [router],
  );

  const filteredCommanders = useMemo(() => {
    if (!commanders) return [];

    return commanders
      .filter(commander => {
        if (mana.length > 0 && !isEqual(mana, commander.identity.split('')))
          return false;

        if (favoritesOnly && !favorites?.includes(commander.name)) return false;

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
  }, [
    commanders,
    decks,
    favoritesOnly,
    favorites,
    mana,
    search,
    sortColumn,
    uniqueCards,
    winrate,
  ]);

  const rows = useMemo(
    () =>
      filteredCommanders.map((commander, index) => (
        <Row
          columns={columns}
          key={commander.name}
          onClick={getHandleRowClick(commander)}
        >
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
              data-positive={
                commander.winrate > (averageStats?.winrate ?? 0.25)
              }
            >
              {(commander.winrate * 100).toFixed(2)}%
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
            <FavoritesToggle
              isFavorite={favorites?.includes(commander.name) ?? false}
              name={commander.name}
            />
          </WithTableDivider>
        </Row>
      )),
    [
      averageStats?.winrate,
      columns,
      favorites,
      filteredCommanders,
      getHandleRowClick,
    ],
  );

  const isLoading = isCommandersLoading || isAverageLoading;

  const isFetching = isCommandersFetching || isAverageFetching;

  if (isLoading)
    return <span className={styles['loading-message']}>Loading...</span>;

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
