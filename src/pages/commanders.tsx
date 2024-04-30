import { FC } from 'react';

import { DateTime } from 'luxon';

import Page from '@app/components/Page';
import commandersApi, { getCommanders } from '@app/store/api/commanders';
import { wrapper } from '@app/store/store';
import { RootState } from '@app/store/store';
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
    const baseProps = parseBaseContext(context);

    const { filters } = store.getState() as RootState;

    store.dispatch(
      getCommanders.initiate({
        dateAfter: DateTime.fromSeconds(filters.dateAfter).toISODate(),
        sizeMin: filters.size[0] ? Number(filters.size[0]) : null,
        sizeMax: filters.size[1] ? Number(filters.size[1]) : null,
        topCut: filters.topCut ? Number(filters.topCut) : null,
      }),
    );

    await Promise.all(
      store.dispatch(commandersApi.util.getRunningQueriesThunk()),
    );

    return {
      props: {
        ...baseProps,
      },
    };
  },
);

export default Commanders;
