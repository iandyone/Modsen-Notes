import { FC, useState } from 'react';

import welcomeIcon from '@assets/welcome.svg';
import { SignInForm, SignUpForm } from '@components/Forms';
import { Heading } from '@components/ui/Heading';
import { AUTH_MODE } from '@constants';

import styles from './styles.module.css';

const { SIGN_IN, SIGN_UP } = AUTH_MODE;

export const HomePage: FC = () => {
  const a = 1;
  const [authMode, setAuthMode] = useState(SIGN_IN);

  const handleOnClickAuthButton = () => {
    setAuthMode(authMode === SIGN_IN ? SIGN_UP : SIGN_IN);
  };

  return (
    <article className={styles.wrapper}>
      <Heading title="Welcome to notes" message="Please sign in to your account or create a new" icon={welcomeIcon} />

      <div className={styles.auth}>
        {authMode === SIGN_IN && <SignInForm className={styles.form} />}

        {authMode === SIGN_UP && <SignUpForm className={styles.form} />}

        <p className={styles.linkBar}>
          Don't have an account?&nbsp;
          <span className={styles.authButton} onClick={handleOnClickAuthButton}>
            {authMode === SIGN_IN ? 'Sign up' : 'Sign in'}
          </span>
        </p>
      </div>
    </article>
  );
};
