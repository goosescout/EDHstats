export type Column = {
  name: string;
  width: number | 'fill';
  sort: 'asc' | 'desc' | 'none' | null;
};
