import ManaSymbol from '@app/components/ManaSymbol';
import { useAppDispatch, useAppSelector } from '@app/store';
import { setMana } from '@app/store/slices/filters';
import { ManaT } from '@app/utils/types';

import styles from './ManaFilter.module.scss';

const manaSymbols: ManaT[] = ['W', 'U', 'B', 'R', 'G', 'C'];

const ManaFilter = () => {
  const dispatch = useAppDispatch();

  const { mana } = useAppSelector(({ filters }) => filters);

  const getManaToggle = (toggled: ManaT) => () => {
    if (mana.includes(toggled)) {
      dispatch(setMana(mana.filter(symbol => symbol !== toggled)));
    } else {
      dispatch(setMana([...mana, toggled]));
    }
  };

  return (
    <div className={styles.wrapper}>
      {manaSymbols.map(symbol => (
        <button
          key={symbol}
          data-active={mana.includes(symbol)}
          onClick={getManaToggle(symbol)}
        >
          <ManaSymbol symbol={symbol} size={40} />
        </button>
      ))}
    </div>
  );
};

export default ManaFilter;
