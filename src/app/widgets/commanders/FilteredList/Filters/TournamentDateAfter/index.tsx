import { ChangeEventHandler } from 'react';

import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';

import Input from '@app/components/Input';
import { useAppSelector } from '@app/store';
import { setTournamentDateAfter } from '@app/store/slices/filters';

import styles from './TournamentDateAfter.module.scss';

const TournamentDateAfter = () => {
  const dispatch = useDispatch();

  const timestamp = useAppSelector(({ filters }) => filters.dateAfter);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const date = DateTime.fromJSDate(target.valueAsDate ?? new Date());
    if (date.isValid) dispatch(setTournamentDateAfter(date.toSeconds()));
  };

  const currentDate = DateTime.fromSeconds(timestamp);

  return (
    <label className={styles.wrapper}>
      Tournament date after:
      <Input
        type="date"
        value={currentDate.toFormat('yyyy-MM-dd')}
        onChange={handleChange}
      />
    </label>
  );
};

export default TournamentDateAfter;
