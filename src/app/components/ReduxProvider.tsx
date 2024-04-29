/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';

import { Provider } from 'react-redux';

import { watchMedia } from '@app/store/external';
import { makeReduxStore, RootState } from '@app/store/store';

interface IReduxProviderProps {
  children: React.ReactNode;
  redux?: RootState;
}

export default function ReduxProvider({
  children,
  redux = undefined,
}: IReduxProviderProps) {
  const store = useMemo(() => {
    const instance = makeReduxStore(redux);

    return instance;
  }, []);

  useEffect(() => {
    watchMedia(store);
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
