import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import HomeLink from '@/components/Navbar/HomeLink';

import styles from './Navbar.module.scss';

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
              router.pathname === href && styles.active,
              styles['navbar-link'],
            )}
          >
            {text}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
