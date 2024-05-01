import { FC } from 'react';

import styles from './IndividualAnalysis.module.scss';

type IndividualAnalysisProps = {
  name: string;
};

const IndividualAnalysis: FC<IndividualAnalysisProps> = ({ name }) => {
  return (
    <div className={styles.wrapper}>
      <h2>Individual card analysis</h2>

      <div className={styles.info}></div>
    </div>
  );
};

export default IndividualAnalysis;
