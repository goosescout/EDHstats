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
  token: Cookies.get('token') ?? null,
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
      {
        payload,
      }: PayloadAction<{ username: string; id: number; token: string }>,
    ) {
      state.username = payload.username;
      state.id = payload.id;
      state.token = payload.token;
    },
    logout(state) {
      state.username = null;
      state.id = null;
      state.token = null;
    },
  },
});

export const { setMedia, setUser, logout } = commonSlice.actions;

export default commonSlice.reducer;
