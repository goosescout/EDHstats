import { useMemo } from 'react';

import { DateTime } from 'luxon';

import { useAppSelector } from '@app/store';
import useDebounce from '@app/utils/hooks/useDebounce';

const useTournamentFilters = () => {
  const { dateAfter, size, topCut } = useAppSelector(({ filters }) => filters);

  const tournamentParams = useMemo(
    () => ({
      dateAfter: DateTime.fromSeconds(dateAfter).toISODate(),
      sizeMin: size[0] ? Number(size[0]) : null,
      sizeMax: size[1] ? Number(size[1]) : null,
      topCut: topCut ? Number(topCut) : null,
    }),
    [dateAfter, size, topCut],
  );

  const debouncedParams = useDebounce(tournamentParams, 800);

  return debouncedParams;
};

export default useTournamentFilters;
