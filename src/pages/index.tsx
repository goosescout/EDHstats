import { FC } from 'react';

import { useRouter } from 'next/router';

import LoginContainer from '@app/components/LoginContainer';
import Logout from '@app/components/Logout';
import { useAppSelector } from '@app/store';
import { wrapper } from '@app/store/store';
import styles from '@app/styles/Home.module.scss';
import parseBaseContext from '@app/utils/parseBaseContext';
import { BasePageProps } from '@app/utils/types';

type HomeProps = BasePageProps;

const Home: FC<HomeProps> = () => {
  const router = useRouter();

  const { username } = useAppSelector(({ common }) => common);

  const handleCardChoicesClick = () => router.push('/card-choices');

  const isLoggedIn = !!username;

  return (
    <div className={styles['home-page']}>
      <div className={styles.top}>
        <div className={styles['top-wrapper']}>
          <h1>Your winning move</h1>

          <div className={styles.container}>
            <h2>Win more with statistics</h2>

            <p>
              Analyze card choices, look for winning commanders and find decks
              that fit into your budget.
            </p>

            <button onClick={handleCardChoicesClick}>
              Go to card choices →
            </button>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles['main-wrapper']}>
          <div>
            <h2>Welcome to the world of stats!</h2>

            <p>
              The most profound EDH analysis tool. This website grants you
              access to a vast database of EDH decks, cards and statistics. You
              can use it to analyze card choices, look for winning commanders
              and find decks that fit into your budget.
            </p>

            {isLoggedIn ? (
              <>
                <p>Thanks for using our service, {username}!</p>
                <Logout className={styles.logout} />
              </>
            ) : (
              <p>
                Login to get access to all features and start winning more
                games!
              </p>
            )}
          </div>

          {!isLoggedIn && <LoginContainer />}
        </div>
      </div>
    </div>
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
