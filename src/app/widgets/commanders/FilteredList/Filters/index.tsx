import { useCallback, MouseEventHandler } from 'react';

import Button from '@/components/Button';
import { useAppDispatch } from '@/store';
import { clearFilters } from '@/store/slices/filters';

import styles from './Filters.module.scss';
import Search from './Search';

export const DEBOUNCE_DELAY = 800;

const Filters = () => {
  const dispatch = useAppDispatch();

  const handleClear = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Search />

      <Button data-type="secondary" onClick={handleClear}>
        Clear filters
      </Button>
    </div>
  );
};

export default Filters;
