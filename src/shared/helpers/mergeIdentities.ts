const colors = ['W', 'U', 'B', 'R', 'G'];

export const mergeIdentities = (left: string, right: string) => {
  let result = '';
  for (const color of colors)
    if (left.includes(color) || right.includes(color)) result += color;

  return result || 'C';
};
