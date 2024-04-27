import { useCallback, ChangeEventHandler, useState, useEffect } from 'react';

import Searchbar from '@/components/Searchbar';
import { useAppDispatch, useAppSelector } from '@/store';
import { setSearch } from '@/store/slices/filters';
import useDebouncedCallback from '@/utils/hooks/useDebouncedCallback';
import { DEBOUNCE_DELAY } from '@/widgets/commanders/FilteredList/Filters';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useAppDispatch();

  const { search } = useAppSelector(({ filters }) => filters);

  const [currentSearch, setCurrentSearch] = useState(search);

  const handleSearchChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => setCurrentSearch(target.value),
    [],
  );

  const callback = useCallback(
    () => dispatch(setSearch(currentSearch)),
    [currentSearch, dispatch],
  );

  useDebouncedCallback(callback, DEBOUNCE_DELAY);

  // Update the current search value when the search is cleared or updated from outside
  useEffect(() => {
    setCurrentSearch(search);
  }, [search]);

  return (
    <Searchbar
      className={styles.search}
      value={currentSearch}
      onChange={handleSearchChange}
    />
  );
};

export default Search;
