import { FC } from 'react';

import { DateTime } from 'luxon';
import { useRouter } from 'next/router';

import Page from '@app/components/Page';
import analyticsApi, { getAverageStats } from '@app/store/api/analytics';
import commandersApi, {
  getCommander,
  getImages,
  useGetCommanderQuery,
} from '@app/store/api/commanders';
import { wrapper } from '@app/store/store';
import styles from '@app/styles/CommanderAnalytics.module.scss';
import useTournamentFilters from '@app/utils/hooks/useTournamentFilters';
import parseBaseContext from '@app/utils/parseBaseContext';
import { BasePageProps } from '@app/utils/types';
import CommandersSearch from '@app/widgets/card-choices/CommandersSearch';
import OverallStats from '@app/widgets/card-choices/OverallStats';

type CommanderAnalyticsProps = BasePageProps;

const CommanderAnalytics: FC<CommanderAnalyticsProps> = () => {
  const router = useRouter();

  const name = router.query.name as string;

  const debouncedParams = useTournamentFilters();

  const { data, isError } = useGetCommanderQuery({
    name,
    ...debouncedParams,
  });

  return (
    <Page className={styles['commander-analytics-page']}>
      <h1>Card Choices</h1>
      <p>
        Choose a commander and see all the cards that are present in its decks.
        Analyze how each card impacts winrate, group cards together and build
        your perfect deck!
      </p>

      <CommandersSearch initialCommander={name} />

      {isError ? (
        <div className={styles.error}>
          Failed to load commander. Try to search for a commander with a
          different name
        </div>
      ) : (
        <OverallStats name={name} identity={data?.identity} />
      )}
    </Page>
  );
};

export const getServerSideProps =
  wrapper.getServerSideProps<CommanderAnalyticsProps>(
    store => async context => {
      const start = Date.now();
      const baseProps = parseBaseContext(context);

      const name = context.params?.name as string;

      const { filters } = store.getState();

      const tournamentParams = {
        dateAfter: DateTime.fromSeconds(filters.dateAfter).toISODate(),
        sizeMin: filters.size[0] ? Number(filters.size[0]) : null,
        sizeMax: filters.size[1] ? Number(filters.size[1]) : null,
        topCut: filters.topCut ? Number(filters.topCut) : null,
      };

      store.dispatch(getCommander.initiate({ name, ...tournamentParams }));
      store.dispatch(getImages.initiate(name));
      store.dispatch(getAverageStats.initiate(tournamentParams));

      await Promise.all([
        ...store.dispatch(commandersApi.util.getRunningQueriesThunk()),
        ...store.dispatch(analyticsApi.util.getRunningQueriesThunk()),
      ]);

      baseProps.serverRenderTime += Math.round(Date.now() - start) / 1000;

      return {
        props: {
          ...baseProps,
        },
      };
    },
  );

export default CommanderAnalytics;
