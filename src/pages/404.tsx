import Image from 'next/image';

import Page from '~/app/components/Page';

import styles from '@/styles/404.module.scss';

const NotFound = () => (
  <Page className={styles['not-found-page']}>
    <Image
      src="/static/images/OneWithNothing.png"
      alt="One With Nothing"
      height={520}
      width={372}
    />
    <p>The page you have requested does not exist.</p>
  </Page>
);

export default NotFound;
