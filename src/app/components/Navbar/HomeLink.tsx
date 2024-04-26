import Link from 'next/link';

import Logo from '~/assets/icons/Logo';

import styles from './HomeLink.module.scss';

const HomeLink = () => {
  return (
    <Link href="/" className={styles['home-link']}>
      <Logo />
    </Link>
  );
};

export default HomeLink;
