import { FC } from 'react';

import { GetServerSideProps } from 'next';

import Page from '@app/components/Page';
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

export const getServerSideProps: GetServerSideProps<
  CommandersProps
> = async context => {
  const baseProps = parseBaseContext(context);

  return {
    props: {
      ...baseProps,
    },
  };
};

export default Commanders;
