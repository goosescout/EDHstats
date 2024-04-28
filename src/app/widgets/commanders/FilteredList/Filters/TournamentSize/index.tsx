import RangeFilter from '@/components/RangeFilter';
import { useAppDispatch, useAppSelector } from '@/store';
import { setTournamentSize } from '@/store/slices/filters';

export default function TournamentSize() {
  const dispatch = useAppDispatch();

  const [left, right] = useAppSelector(({ filters }) => filters.size);

  const handleChange = (left: string, right: string) => {
    if (
      (Number(left) >= 0 || left === '') &&
      (Number(right) >= 0 || right === '')
    )
      dispatch(setTournamentSize([left, right]));
  };

  return (
    <RangeFilter
      label="Tournament size"
      onChange={handleChange}
      left={left}
      right={right}
      leftPlaceholder="0"
      rightPlaceholder="Infinity"
    />
  );
}
