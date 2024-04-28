import RangeFilter from '@/components/RangeFilter';
import { useAppDispatch, useAppSelector } from '@/store';
import { setAutoincludes } from '@/store/slices/filters';

const Autoincludes = () => {
  const dispatch = useAppDispatch();

  const [left, right] = useAppSelector(({ filters }) => filters.autoincludes);

  const handleChange = (left: string, right: string) => {
    if (
      (Number(left) >= 0 || left === '') &&
      (Number(right) >= 0 || right === '')
    )
      dispatch(setAutoincludes([left, right]));
  };

  return (
    <RangeFilter
      label="Autoincludes"
      onChange={handleChange}
      left={left}
      right={right}
      leftPlaceholder="0"
      rightPlaceholder="Infinity"
    />
  );
};

export default Autoincludes;
