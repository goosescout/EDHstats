import { ChangeEventHandler, FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import ManaContainer from '@app/components/ManaContainer';
import Searchbar from '@app/components/Searchbar';
import { useSearchCommandersQuery } from '@app/store/api/commanders';
import useDebounce from '@app/utils/hooks/useDebounce';

import styles from './CommandersSearch.module.scss';

type CommandersSearchProps = {
  initialCommander?: string;
};

const CommandersSearch: FC<CommandersSearchProps> = ({ initialCommander }) => {
  const router = useRouter();

  const [value, setValue] = useState(initialCommander ?? '');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedValue = useDebounce(value, 500);

  const { data, isFetching } = useSearchCommandersQuery(debouncedValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setValue(target.value);

  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => setIsOpen(false);

  const getHandleClick = (name: string) => () => {
    setValue(name);
    router.push(`/card-choices/${encodeURIComponent(name)}`);
  };

  return (
    <div className={styles.wrapper}>
      <Searchbar
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <div className={styles.dropdown} data-open={isOpen}>
        {isFetching ? (
          <div className={styles.info}>Searching...</div>
        ) : data?.length ? (
          data.map(({ name, identity }) => (
            <div
              className={styles.item}
              key={name}
              onMouseDown={getHandleClick(name)}
            >
              <span>{name}</span>
              <ManaContainer size={16}>{identity}</ManaContainer>
            </div>
          ))
        ) : (
          !isFetching && <div className={styles.info}>No results</div>
        )}
      </div>
    </div>
  );
};

export default CommandersSearch;
