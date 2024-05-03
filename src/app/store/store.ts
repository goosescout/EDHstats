import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';

import apiReducers, { middlewares } from './api';
import dataReducers from './slices';

const combinedReducer = combineReducers({
  ...dataReducers,
  ...apiReducers,
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeReduxStore: MakeStore<any> = () =>
  configureStore({
    reducer,
    middleware: base => base().concat(...middlewares),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeReduxStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeReduxStore);
