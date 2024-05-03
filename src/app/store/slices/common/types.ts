import { MediaT } from '@app/utils/mediaQuery';

export type CommonSlice = {
  media: MediaT;
  username: string | null;
  id: number | null;
};
