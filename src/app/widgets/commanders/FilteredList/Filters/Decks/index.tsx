import RangeFilter from '@app/components/RangeFilter';
import { useAppDispatch, useAppSelector } from '@app/store';
import { setDecks } from '@app/store/slices/filters';

const Decks = () => {
  const dispatch = useAppDispatch();

  const [left, right] = useAppSelector(({ filters }) => filters.decks);

  const handleChange = (left: string, right: string) => {
    if (
      (Number(left) >= 1 || left === '') &&
      (Number(right) >= 1 || right === '')
    )
      dispatch(setDecks([left, right]));
  };

  return (
    <RangeFilter
      label="Decks"
      onChange={handleChange}
      left={left}
      right={right}
      leftPlaceholder="1"
      rightPlaceholder="Infinity"
    />
  );
};

export default Decks;
