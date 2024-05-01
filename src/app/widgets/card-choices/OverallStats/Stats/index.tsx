import { FC } from 'react';

import Tooltip from '@app/components/Tooltip';
import { useGetAverageStatsQuery } from '@app/store/api/analytics';
import { useGetCommanderQuery } from '@app/store/api/commanders';
import useTournamentFilters from '@app/utils/hooks/useTournamentFilters';

import styles from './Stats.module.scss';

type StatsProps = {
  name: string;
};

type StatsDetails = {
  name: string;
  tooltipText: string;
  key: string;
  averageKey: string | null;
};

const stats: StatsDetails[] = [
  {
    name: 'Avg winrate:',
    tooltipText:
      'Average winrate (wins divided by all games) of all decks that satisfy the filters',
    key: 'winrate',
    averageKey: 'winrate',
  },
  {
    name: 'Avg drawrare:',
    tooltipText:
      'Average drawrate (draws divided by all games) of all decks that satisfy the filters',
    key: 'drawrate',
    averageKey: 'drawrate',
  },
  {
    name: 'Total decks:',
    tooltipText:
      'Total number of decks with this commander that satisfy the filters',
    key: 'decks',
    averageKey: null,
  },
  {
    name: 'Autoincludes:',
    tooltipText:
      'Number of cards that are included in 90% or more of decks that satisfy the filters',
    key: 'autoincludes',
    averageKey: null,
  },
  {
    name: 'Unique cards:',
    tooltipText: 'Number of unique cards in all decks that satisfy the filters',
    key: 'unique',
    averageKey: null,
  },
  {
    name: 'Avg price:',
    tooltipText: 'Average price of all decks that satisfy the filters',
    key: 'avgPrice',
    averageKey: null,
  },
];

const Stats: FC<StatsProps> = ({ name }) => {
  const debouncedParams = useTournamentFilters();

  const { data: commanderStats, isFetching: isCommandersFetching } =
    useGetCommanderQuery({
      name,
      ...debouncedParams,
    });
  const { data: averageStats, isFetching: isAverageFetching } =
    useGetAverageStatsQuery(debouncedParams);

  const isLoading = isCommandersFetching || isAverageFetching;

  if (!commanderStats || !averageStats)
    return (
      <div className={styles.wrapper}>
        <span className={styles.loading}>Loading...</span>
      </div>
    );

  return (
    <div className={styles.wrapper} data-loading={isLoading}>
      <div className={styles.keys}>
        {stats.map(({ name, tooltipText, key }) => (
          <div key={key}>
            <Tooltip text={tooltipText} />
            <span>{name}</span>
          </div>
        ))}
      </div>

      <div className={styles.values}>
        {stats.map(({ key, averageKey }) => {
          let value: string;

          switch (key) {
            case 'winrate':
            case 'drawrate':
              value = (commanderStats[key] * 100).toFixed(2);
              break;
            case 'avgPrice':
              value = commanderStats[key].toFixed(2);
              break;
            default:
              value = String(commanderStats[key]);
          }

          if (!averageKey)
            return (
              <span key={key}>
                {key === 'avgPrice' && '$'}
                {value}
              </span>
            );

          const isBelowAverage = averageStats[averageKey] > commanderStats[key];
          const color = isBelowAverage && key === 'winrate' ? 'red' : 'green';
          const avgValue = (averageStats[averageKey] * 100).toFixed(2);

          return (
            <span key={key}>
              <span data-color={color}>{value}%</span>
              {averageKey &&
                ` (${isBelowAverage ? 'below' : 'above'} ${avgValue} total avg)`}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
