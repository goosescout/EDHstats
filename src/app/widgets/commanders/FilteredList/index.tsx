import styles from './FilteredList.module.scss';
import Filters from './Filters';
import List from './List';

const FilteredList = () => (
  <div className={styles.wrapper}>
    <Filters />

    <List />
  </div>
);

export default FilteredList;
