import { FC } from 'react';

import Tooltip from '@app/components/Tooltip';
import { useGetCommanderStatsQuery } from '@app/store/api/analytics';
import { useGetCommanderQuery } from '@app/store/api/commanders';
import useTournamentFilters from '@app/utils/hooks/useTournamentFilters';

import styles from './IndividualAnalysis.module.scss';

type IndividualAnalysisProps = {
  name: string;
};

type StatsDetails = {
  name: string;
  tooltipText: string;
  key: string;
};

const stats: StatsDetails[] = [
  {
    name: 'Avg winrate:',
    tooltipText:
      'Average winrate (wins divided by all games) of all decks that satisfy the filters, included and excluded cards',
    key: 'winrate',
  },
  {
    name: 'Avg drawrare:',
    tooltipText:
      'Average drawrate (draws divided by all games) of all decks that satisfy the filters, included and excluded cards',
    key: 'drawrate',
  },
  {
    name: 'Total decks:',
    tooltipText:
      'Total number of decks with this commander that satisfy the filters, included and excluded cards',
    key: 'decks',
  },
];

const IndividualAnalysis: FC<IndividualAnalysisProps> = ({ name }) => {
  const debouncedParams = useTournamentFilters();

  const { data: detailedStats, isFetching: isDetailedFetching } =
    useGetCommanderStatsQuery({
      name,
      ...debouncedParams,
    });
  const { data: averageStats, isFetching: isAverageFetching } =
    useGetCommanderQuery({
      name,
      ...debouncedParams,
    });

  const isLoading = isDetailedFetching || isAverageFetching;

  if (!detailedStats || !averageStats) return null;

  return (
    <div className={styles.wrapper}>
      <h2>Individual card analysis</h2>

      <div className={styles.info} data-loading={isLoading}>
        <div className={styles.keys}>
          {stats.map(({ name, tooltipText, key }) => (
            <div key={key}>
              <Tooltip text={tooltipText} />
              <span>{name}</span>
            </div>
          ))}
        </div>

        <div className={styles.values}>
          {stats.map(({ key }) => {
            if (key === 'decks') {
              const percent =
                averageStats[key] > 0
                  ? ((detailedStats[key] / averageStats[key]) * 100).toFixed(2)
                  : '100.00';

              return (
                <span key={key}>
                  {detailedStats[key]} ({percent}% of all {averageStats[key]}{' '}
                  decks available)
                </span>
              );
            }

            const isBelowAverage = detailedStats[key] < averageStats[key];
            const value = (detailedStats[key] * 100).toFixed(2);
            const averageValue = (averageStats[key] * 100).toFixed(2);

            let prefix: string;
            if (value === averageValue) prefix = 'equals';
            else if (isBelowAverage) prefix = 'below';
            else prefix = 'above';

            const color =
              (isBelowAverage && key === 'winrate') ||
              (!isBelowAverage && key === 'drawrate')
                ? 'red'
                : 'green';

            return (
              <span key={key}>
                <span data-color={color}>{value}%</span> ({prefix}{' '}
                {averageValue}% avg {key} for this commander)
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IndividualAnalysis;
