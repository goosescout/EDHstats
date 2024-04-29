import ManaSymbol from '@app/components/ManaSymbol';
import { ManaT } from '@app/utils/types';

import styles from './ManaContainer.module.scss';

type ManaRowProps = {
  children: string;
};

const ManaContainer = ({ children: mana }: ManaRowProps) => (
  <div className={styles.wrapper}>
    {mana.split('').map(symbol => (
      <ManaSymbol key={symbol} size={20} symbol={symbol as ManaT} />
    ))}
  </div>
);

export default ManaContainer;
