import { useCallback, MouseEventHandler } from 'react';

import Button from '@app/components/Button';
import Line from '@app/components/Line';
import { useAppDispatch, useAppSelector } from '@app/store';
import { clearFilters } from '@app/store/slices/filters';
import TopCut from '@app/widgets/filters/TopCut';
import TournamentDateAfter from '@app/widgets/filters/TournamentDateAfter';
import TournamentSize from '@app/widgets/filters/TournamentSize';

import Autoincludes from './Autoincludes';
import Decks from './Decks';
import FavoritesOnly from './FavoritesOnly';
import styles from './Filters.module.scss';
import ManaFilter from './ManaFilter';
import Search from './Search';
import UniqueCards from './UniqueCards';
import Winrate from './Winrate';

export const DEBOUNCE_DELAY = 800;

const Filters = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(({ common }) => common.id !== null);

  const handleClear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Search />
      <ManaFilter />
      {isLoggedIn && <FavoritesOnly />}

      <Line />

      <Winrate />
      <Decks />
      <Autoincludes />
      <UniqueCards />

      <Line />

      <TournamentSize />
      <TournamentDateAfter />
      <TopCut />

      <Line />

      <Button data-type="secondary" onClick={handleClear}>
        Clear filters
      </Button>
    </div>
  );
};

export default Filters;
