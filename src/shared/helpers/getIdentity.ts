const colors = ['W', 'U', 'B', 'R', 'G'];

export const getIdentity = (identity: string) => {
  let result = '';
  for (const color of colors) if (identity.includes(color)) result += color;

  return result || 'C';
};
