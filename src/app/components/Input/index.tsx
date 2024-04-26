import { InputHTMLAttributes, forwardRef } from 'react';

import clsx from 'clsx';

import styles from './styles.module.scss';

const defaultProps = {
  spellCheck: false,
  type: 'text',
};

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input(props, ref) {
  return (
    <input
      ref={ref}
      {...defaultProps}
      {...props}
      className={clsx(props.className, styles['input'])}
    />
  );
});

export default Input;
