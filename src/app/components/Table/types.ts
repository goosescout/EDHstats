export type Column = {
  name: string;
  key: string;
  width: number | 'fill';
  sort: 'asc' | 'desc' | 'none' | null;
};
