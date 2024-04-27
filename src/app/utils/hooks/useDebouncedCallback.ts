import { useEffect } from 'react';

const useDebouncedCallback = (callback: () => unknown, delay: number) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, callback]);
};

export default useDebouncedCallback;
