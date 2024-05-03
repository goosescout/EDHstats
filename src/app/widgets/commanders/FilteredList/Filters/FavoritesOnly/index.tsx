import SwitchInput from '@app/components/SwitchInput';
import { useAppDispatch, useAppSelector } from '@app/store';
import { setFavoritesOnly } from '@app/store/slices/filters';

import styles from './FavoritesOnly.module.scss';

const FavoritesOnly = () => {
  const dispatch = useAppDispatch();

  const { favoritesOnly } = useAppSelector(({ filters }) => filters);

  const toggleFavoritesOnly = () => dispatch(setFavoritesOnly(!favoritesOnly));

  return (
    <div>
      <SwitchInput
        className={styles.switch}
        toggled={favoritesOnly}
        onChange={toggleFavoritesOnly}
      >
        Show favorites only
      </SwitchInput>
    </div>
  );
};

export default FavoritesOnly;
