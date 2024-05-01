import ManaSymbol from '@app/components/ManaSymbol';
import { ManaT } from '@app/utils/types';

import styles from './ManaContainer.module.scss';

type ManaContainerProps = {
  size?: number;
  children: string;
};

const ManaContainer = ({ size = 20, children: mana }: ManaContainerProps) => (
  <div className={styles.wrapper}>
    {mana.split('').map(symbol => (
      <ManaSymbol key={symbol} size={size} symbol={symbol as ManaT} />
    ))}
  </div>
);

export default ManaContainer;
