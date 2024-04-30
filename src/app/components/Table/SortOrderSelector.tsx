import { memo } from 'react';

import ArrowDown from '~/assets/icons/ArrowDown';

import styles from './SortOrderSelector.module.scss';

type SortOrderSelectorProps = {
  state: 'asc' | 'desc' | 'none' | null;
  name: string;
  onClick: (state: 'asc' | 'desc' | 'none') => void;
};

const SortOrderSelector = memo(function SortOrderSelector({
  state,
  name,
  onClick,
}: SortOrderSelectorProps) {
  const handleClick = () => {
    if (state === 'asc') onClick('desc');
    else if (state === 'desc') onClick('asc');
    else onClick('desc');
  };

  if (state === null) return <span>{name}</span>;

  return (
    <div className={styles.wrapper} data-state={state} onClick={handleClick}>
      <span>{name}</span>
      {(state === 'none' || state === 'asc') && <ArrowDown />}
      {(state === 'none' || state === 'desc') && <ArrowDown />}
    </div>
  );
});

export default SortOrderSelector;
