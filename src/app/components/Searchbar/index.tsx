import { FC, HTMLAttributes, useCallback, useRef } from 'react';

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
        className={styles.input}
        {...props}
      />
    </div>
  );
};

export default Searchbar;
