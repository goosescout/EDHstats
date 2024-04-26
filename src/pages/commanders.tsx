import Page from '@/components/Page';
import styles from '@/styles/Commanders.module.scss';
import FilteredList from '@/widgets/commanders/FilteredList';

const Commanders = () => (
  <Page className={styles['commanders-page']}>
    <h1>Commanders</h1>
    <p>
      Find the best commander that suits your needs. Cheap, consistent, flexible
      - we have it all. Click on a commander to see more detailed information
      and investigate its card choices.
    </p>

    <FilteredList />
  </Page>
);

export default Commanders;
