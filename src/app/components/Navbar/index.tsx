import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import HomeLink from '@app/components/Navbar/HomeLink';

import styles from './Navbar.module.scss';
import Profile from './Profile';

type LinkDetails = {
  text: string;
  href: string;
};

const links: LinkDetails[] = [
  {
    text: 'Card choices',
    href: '/card-choices',
  },
  {
    text: 'Commanders',
    href: '/commanders',
  },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className={styles.wrapper}>
      <div className={styles.content}>
        <HomeLink />
        {links.map(({ text, href }) => (
          <Link
            key={text}
            href={href}
            className={clsx(
              router.pathname.startsWith(href) && styles.active,
              styles['navbar-link'],
            )}
          >
            {text}
          </Link>
        ))}

        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
