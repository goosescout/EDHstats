import RangeFilter from '@/components/RangeFilter';
import { useAppDispatch, useAppSelector } from '@/store';
import { setWinrate } from '@/store/slices/filters';

const Winrate = () => {
  const dispatch = useAppDispatch();

  const [left, right] = useAppSelector(({ filters }) => filters.winrate);

  const handleChange = (left: string, right: string) => {
    if (
      Number(left) >= 0 &&
      Number(left) <= 100 &&
      Number(right) >= 0 &&
      Number(right) <= 100
    )
      dispatch(setWinrate([left, right]));
  };

  return (
    <RangeFilter
      label="Winrate"
      onChange={handleChange}
      left={left}
      right={right}
      leftPlaceholder="0%"
      rightPlaceholder="100%"
    />
  );
};

export default Winrate;
