import styles from './FilteredList.module.scss';
import Filters from './Filters';

const FilteredList = () => (
  <div className={styles.wrapper}>
    <Filters />
  </div>
);

export default FilteredList;
