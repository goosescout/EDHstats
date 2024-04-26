import { subscribeMedia } from '@/utils/mediaQuery';

import { setMedia } from './slices/common';

import type { AppStore } from './store';

// eslint-disable-next-line import/prefer-default-export
export function watchMedia(store: AppStore) {
  subscribeMedia(media => {
    store.dispatch(setMedia(media));
  });
}
