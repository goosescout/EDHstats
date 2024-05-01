import { FC } from 'react';

import Page from '@app/components/Page';
import { wrapper } from '@app/store/store';
import styles from '@app/styles/CardChoices.module.scss';
import parseBaseContext from '@app/utils/parseBaseContext';
import { BasePageProps } from '@app/utils/types';
import CommandersSearch from '@app/widgets/card-choices/CommandersSearch';

type CardChoicesProps = BasePageProps;

const CardChoices: FC<BasePageProps> = () => (
  <Page className={styles['card-choices-page']}>
    <h1>Card Choices</h1>
    <p>
      Choose a commander and see all the cards that are present in its decks.
      Analyze how each card impacts winrate, group cards together and build your
      perfect deck!
    </p>

    <CommandersSearch />
  </Page>
);

export const getServerSideProps = wrapper.getServerSideProps<CardChoicesProps>(
  store => async context => {
    const start = Date.now();
    const baseProps = parseBaseContext(context);

    baseProps.serverRenderTime += Math.round(Date.now() - start) / 1000;

    return {
      props: {
        ...baseProps,
      },
    };
  },
);

export default CardChoices;
