import { FC } from 'react';

import { DateTime } from 'luxon';

import Page from '@app/components/Page';
import analyticsApi, { getAverageStats } from '@app/store/api/analytics';
import commandersApi, {
  getCommanders,
  getFavorites,
} from '@app/store/api/commanders';
import { wrapper } from '@app/store/store';
import styles from '@app/styles/Commanders.module.scss';
import parseBaseContext from '@app/utils/parseBaseContext';
import { BasePageProps } from '@app/utils/types';
import FilteredList from '@app/widgets/commanders/FilteredList';

type CommandersProps = BasePageProps;

const Commanders: FC<CommandersProps> = () => (
  <Page className={styles['commanders-page']}>
    <h1>Commanders</h1>
    <p>
      Find the best commander that suits your needs. Cheap, consistent, flexible
      - we have it all. Click on a commander to see more detailed information
      and investigate its card choices.
    </p>

    <FilteredList />
  </Page>
);

export const getServerSideProps = wrapper.getServerSideProps<CommandersProps>(
  store => async context => {
    const start = Date.now();
    const baseProps = await parseBaseContext(context, store);

    const { filters } = store.getState();

    const tournamentParams = {
      dateAfter: DateTime.fromSeconds(filters.dateAfter).toISODate(),
      sizeMin: filters.size[0] ? Number(filters.size[0]) : null,
      sizeMax: filters.size[1] ? Number(filters.size[1]) : null,
      topCut: filters.topCut ? Number(filters.topCut) : null,
    };

    store.dispatch(getCommanders.initiate(tournamentParams));
    store.dispatch(getAverageStats.initiate(tournamentParams));
    if (store.getState().common.id !== null)
      store.dispatch(getFavorites.initiate());

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

export default Commanders;
