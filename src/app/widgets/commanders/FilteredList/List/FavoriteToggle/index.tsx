import { FC, MouseEventHandler } from 'react';

import StarIconSolid from '~/assets/icons/StarIcon';

import { useAppSelector } from '@app/store';
import { useToggleFavoriteMutation } from '@app/store/api/commanders';

import styles from './FavoriteToggle.module.scss';

type FavoritesToggleProps = {
  name: string;
  isFavorite: boolean;
};

const FavoritesToggle: FC<FavoritesToggleProps> = ({ name, isFavorite }) => {
  const isLoggedIn = useAppSelector(({ common }) => common.id !== null);

  const [toggleFavorite] = useToggleFavoriteMutation();

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();

    toggleFavorite(name);
  };

  if (!isLoggedIn) return null;

  return (
    <button
      className={styles.toggle}
      data-favorite={isFavorite}
      onClick={handleClick}
    >
      <StarIconSolid />
    </button>
  );
};

export default FavoritesToggle;
