import { useCallback, MouseEventHandler } from 'react';

import Button from '@app/components/Button';
import Line from '@app/components/Line';
import { useAppDispatch } from '@app/store';
import { clearFilters } from '@app/store/slices/filters';

import Autoincludes from './Autoincludes';
import Decks from './Decks';
import styles from './Filters.module.scss';
import ManaFilter from './ManaFilter';
import Search from './Search';
import TopCut from './TopCut';
import TournamentDateAfter from './TournamentDateAfter';
import TournamentSize from './TournamentSize';
import UniqueCards from './UniqueCards';
import Winrate from './Winrate';

export const DEBOUNCE_DELAY = 800;

const Filters = () => {
  const dispatch = useAppDispatch();

  const handleClear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Search />
      <ManaFilter />

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
