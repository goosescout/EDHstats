import { ButtonHTMLAttributes, FC } from 'react';

import clsx from 'clsx';

import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  'data-type'?: 'primary' | 'secondary';
};

const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <button
    data-type="primary"
    {...props}
    className={clsx(props.className, styles['button'])}
  >
    {children}
  </button>
);

export default Button;
