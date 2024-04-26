import { ChangeEventHandler, useCallback } from 'react';

import Input from '@/components/Input';

import styles from './RangeFilter.module.scss';

type RangeFilterProps = {
  left: string;
  right: string;
  label: string;
  leftPlaceholder?: string;
  rightPlaceholder?: string;
  onChange: (left: string, right: string) => void;
};

export default function RangeFilter({
  left,
  right,
  label,
  leftPlaceholder,
  rightPlaceholder,
  onChange,
}: RangeFilterProps) {
  const handleLeftChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => onChange(target.value, right),
    [onChange, right],
  );

  const handleRightChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => onChange(left, target.value),
    [onChange, left],
  );

  return (
    <div className={styles['wrapper']}>
      <Input
        type="number"
        value={left}
        onChange={handleLeftChange}
        placeholder={leftPlaceholder}
      />
      <span>≤</span>
      <label>{label}</label>
      <span>≤</span>
      <Input
        type="number"
        value={right}
        onChange={handleRightChange}
        placeholder={rightPlaceholder}
      />
    </div>
  );
}
