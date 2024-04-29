import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ICommonSlice } from '@app/store/slices/common/types';
import { MediaT, queryMedia } from '@app/utils/mediaQuery';

const initialState: ICommonSlice = {
  media: queryMedia(),
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setMedia(state, { payload }: PayloadAction<MediaT>) {
      state.media = payload;
    },
  },
});

export const { setMedia } = commonSlice.actions;

export default commonSlice.reducer;
