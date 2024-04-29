import Searchbar from '@app/components/Searchbar';
import { useAppDispatch, useAppSelector } from '@app/store';
import { setSearch } from '@app/store/slices/filters';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useAppDispatch();

  const { search } = useAppSelector(({ filters }) => filters);

  const handleSearchChange = ({ target }) => dispatch(setSearch(target.value));

  return (
    <Searchbar
      className={styles.search}
      value={search}
      onChange={handleSearchChange}
    />
  );
};

export default Search;
