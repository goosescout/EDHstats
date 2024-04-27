import { FC, HTMLAttributes, useCallback, useRef } from 'react';

import clsx from 'clsx';

import MagnifyingGlass from '~/assets/icons/MagnifyingGlass';

import Input from '@/components/Input';

import styles from './Searchbar.module.scss';

type SearchbarProps = HTMLAttributes<HTMLInputElement> & {
  value: string;
};

const Searchbar: FC<SearchbarProps> = props => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <MagnifyingGlass />
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search..."
        {...props}
        className={clsx(props.className, styles.input)}
      />
    </div>
  );
};

export default Searchbar;
