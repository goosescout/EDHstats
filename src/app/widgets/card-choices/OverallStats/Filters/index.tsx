import TopCut from '@app/widgets/filters/TopCut';
import TournamentDateAfter from '@app/widgets/filters/TournamentDateAfter';
import TournamentSize from '@app/widgets/filters/TournamentSize';

import styles from './Filters.module.scss';

const Filters = () => (
  <div className={styles.wrapper}>
    <h3>Use decks from these tournaments:</h3>
    <TournamentDateAfter />
    <TournamentSize />
    <TopCut />
  </div>
);

export default Filters;
