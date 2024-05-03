import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { CommonSlice } from '@app/store/slices/common/types';
import { MediaT, queryMedia } from '@app/utils/mediaQuery';
import parseToken from '@app/utils/parseToken';

const { username, sub } = Cookies.get('token')
  ? parseToken(Cookies.get('token')!)
  : { username: null, sub: null };

const initialState: CommonSlice = {
  media: queryMedia(),
  username,
  id: sub,
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setMedia(state, { payload }: PayloadAction<MediaT>) {
      state.media = payload;
    },
    setUser(
      state,
      { payload }: PayloadAction<{ username: string; id: number }>,
    ) {
      state.username = payload.username;
      state.id = payload.id;
    },
    logout(state) {
      state.username = null;
      state.id = null;
    },
  },
});

export const { setMedia, setUser, logout } = commonSlice.actions;

export default commonSlice.reducer;
