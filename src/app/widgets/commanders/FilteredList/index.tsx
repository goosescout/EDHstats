import Search from './Filters/Search';

import styles from './FilteredList.module.scss';

const FilteredList = () => (
  <div className={styles.wrapper}>
    <Search />
  </div>
);

export default FilteredList;
