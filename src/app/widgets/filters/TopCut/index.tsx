import { ChangeEventHandler } from 'react';

import Input from '@app/components/Input';
import { useAppDispatch, useAppSelector } from '@app/store';
import { setTopCut } from '@app/store/slices/filters';

import styles from './TopCut.module.scss';

const TopCut = () => {
  const dispatch = useAppDispatch();

  const topCut = useAppSelector(({ filters }) => filters.topCut);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (Number(target.value) || target.value === '')
      dispatch(setTopCut(target.value));
  };

  return (
    <label className={styles.wrapper}>
      Decks from top
      <Input
        type="number"
        placeholder="Infinity"
        value={topCut}
        onChange={handleChange}
      />
      only
    </label>
  );
};

export default TopCut;
