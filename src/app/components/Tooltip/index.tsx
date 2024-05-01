import { FC, useState } from 'react';

import InfoIcon from '~/assets/icons/InfoIcon';

import styles from './Tooltip.module.scss';

type TooltipProps = {
  text: string;
};

const Tooltip: FC<TooltipProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div className={styles.wrapper}>
      <InfoIcon onMouseEnter={showTooltip} onMouseLeave={hideTooltip} />
      <div className={styles.tooltip} data-visible={isVisible}>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
