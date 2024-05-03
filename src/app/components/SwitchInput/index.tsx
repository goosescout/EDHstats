import { ChangeEventHandler, FC, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './SwitchInput.module.scss';

type SwitchInputProps = {
  toggled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  className?: string;
  children?: ReactNode;
};

const SwitchInput: FC<SwitchInputProps> = ({
  toggled,
  onChange,
  value = '',
  className = '',
  children = null,
}) => (
  <label className={clsx(className, styles.label)}>
    <input
      type="checkbox"
      checked={toggled}
      onChange={onChange}
      value={value}
    />
    <span className={styles.switch} />
    {children}
  </label>
);

export default SwitchInput;
