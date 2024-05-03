import { FC } from 'react';

import LoginContainer from '@app/components/LoginContainer';
import Logout from '@app/components/Logout';
import Page from '@app/components/Page';
import { useAppSelector } from '@app/store';
import { wrapper } from '@app/store/store';
import styles from '@app/styles/Home.module.scss';
import parseBaseContext from '@app/utils/parseBaseContext';
import { BasePageProps } from '@app/utils/types';

type HomeProps = BasePageProps;

const Home: FC<HomeProps> = () => {
  const { username } = useAppSelector(({ common }) => common);

  return (
    <Page className={styles['home-page']}>
      <h1>Home</h1>

      <p>
        {username
          ? `Welcome, ${username}!`
          : 'The most profound EDH analysis tool'}
      </p>

      {username ? <Logout className={styles.logout} /> : <LoginContainer />}
    </Page>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<HomeProps>(
  store => async context => {
    const start = Date.now();
    const baseProps = await parseBaseContext(context, store);

    baseProps.serverRenderTime += Math.round(Date.now() - start) / 1000;

    return {
      props: {
        ...baseProps,
      },
    };
  },
);

export default Home;
