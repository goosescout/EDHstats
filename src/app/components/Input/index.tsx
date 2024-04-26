import { FC, InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './styles.module.scss';

const defaultProps = {
  spellCheck: false,
  type: 'text',
};

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = props => (
  <input
    {...defaultProps}
    {...props}
    className={clsx(props.className, styles['input'])}
  />
);

export default Input;
