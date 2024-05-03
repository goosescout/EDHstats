import { FC } from 'react';

import clsx from 'clsx';
import Cookies from 'js-cookie';

import Button from '@app/components/Button';
import { useAppDispatch } from '@app/store';
import { logout } from '@app/store/slices/common';

import styles from './Logout.module.scss';

type LogoutProps = {
  className?: string;
};

const Logout: FC<LogoutProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(logout());
  };

  return (
    <Button
      data-type="primary"
      onClick={handleLogout}
      className={clsx(className, styles.button)}
    >
      Logout
    </Button>
  );
};

export default Logout;
