import { ChangeEvent, FC, FormEventHandler, useState } from 'react';

import Cookies from 'js-cookie';

import Button from '@app/components/Button';
import Input from '@app/components/Input';
import { useAppDispatch } from '@app/store';
import { useSignInMutation, useSignUpMutation } from '@app/store/api/auth';
import { setUser } from '@app/store/slices/common';
import parseToken from '@app/utils/parseToken';

import styles from './LoginContainer.module.scss';

type LoginContainerProps = {
  title?: string;
};

const LoginContainer: FC<LoginContainerProps> = ({ title }) => {
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError(null);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(null);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
    setError(null);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const mutation = isLogin ? signIn : signUp;

    const response = await mutation({ username, password });
    if ('error' in response) {
      setError((response as any).error.data.message);
    } else {
      const token: string = (response as any).data.accessToken;
      const { username, sub, exp } = parseToken(token);
      Cookies.set('token', token, { expires: new Date(exp * 1000) });
      dispatch(setUser({ username, id: sub, token }));
    }
  };

  const loginTitle = title ?? 'Sign In';
  const registerTitle = title ?? 'Sign Up';

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>
        {isLogin ? loginTitle : registerTitle}
      </span>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <Input
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="username"
          />
        </label>

        <label>
          Password:
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
          />
        </label>

        {!isLogin && (
          <label>
            Confirm Password:
            <Input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              autoComplete="new-password"
            />
          </label>
        )}

        <Button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</Button>
      </form>

      {error && <span className={styles.error}>{error}</span>}

      <div className={styles.selector}>
        {isLogin ? (
          <>
            <span>Don&apos;t have an account?</span>
            <Button data-type="secondary" onClick={() => setIsLogin(false)}>
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <span>Already have an account?</span>
            <Button data-type="secondary" onClick={() => setIsLogin(true)}>
              Sign In
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginContainer;
