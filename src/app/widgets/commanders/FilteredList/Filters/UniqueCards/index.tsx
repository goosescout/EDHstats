import RangeFilter from '@app/components/RangeFilter';
import { useAppDispatch, useAppSelector } from '@app/store';
import { setUniqueCards } from '@app/store/slices/filters';

const UniqueCards = () => {
  const dispatch = useAppDispatch();

  const [left, right] = useAppSelector(({ filters }) => filters.uniqueCards);

  const handleChange = (left: string, right: string) => {
    if (
      (Number(left) >= 0 || left === '') &&
      (Number(right) >= 0 || right === '')
    )
      dispatch(setUniqueCards([left, right]));
  };

  return (
    <RangeFilter
      label="Unique Cards"
      onChange={handleChange}
      left={left}
      right={right}
      leftPlaceholder="0"
      rightPlaceholder="Infinity"
    />
  );
};

export default UniqueCards;
