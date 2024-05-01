import { FC } from 'react';

import ManaContainer from '@app/components/ManaContainer';

import CommanderImages from './CommanderImages';
import styles from './OverallStats.module.scss';

type OverallStatsProps = {
  name: string;
  identity?: string;
};

const OverallStats: FC<OverallStatsProps> = ({ name, identity = '' }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{name}</h2>
        <ManaContainer size={32}>{identity}</ManaContainer>
      </div>

      <div className={styles.stats}>
        <CommanderImages name={name} />
      </div>
    </div>
  );
};

export default OverallStats;
