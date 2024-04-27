import ArrowDown from '~/assets/icons/ArrowDown';

import styles from './SortOrderSelector.module.scss';

type SortOrderSelectorProps = {
  state: 'asc' | 'desc' | 'none' | null;
  name: string;
  onClick: (state: 'asc' | 'desc' | 'none') => void;
};

export default function SortOrderSelector({
  state,
  name,
  onClick,
}: SortOrderSelectorProps) {
  const handleClick = () => onClick(state!);

  if (state === null) return <span>{name}</span>;

  if (state === 'none')
    return (
      <div
        className={styles['wrapper']}
        data-state={state}
        onClick={handleClick}
      >
        <span>{name}</span>
        <ArrowDown />
        <ArrowDown />
      </div>
    );

  return (
    <div className={styles['wrapper']} data-state={state}>
      <span>{name}</span>
      <ArrowDown />
    </div>
  );
}
