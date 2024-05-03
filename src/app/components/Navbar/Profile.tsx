import Link from 'next/link';

import ProfileIcon from '~/assets/icons/ProfileIcon';

import { useAppSelector } from '@app/store';

import styles from './Profile.module.scss';

export const Profile = () => {
  const { username } = useAppSelector(({ common }) => common);

  return (
    <Link className={styles.wrapper} href="/">
      <span>{username ?? 'Guest'}</span>
      <ProfileIcon />
    </Link>
  );
};

export default Profile;
