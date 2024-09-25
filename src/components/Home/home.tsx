import { FC, useState } from 'react';

import welcomeIcon from '@assets/welcome.svg';
import { SignInForm, SignUpForm } from '@components/Forms';
import { SignOutForm } from '@components/Forms/SignOutForm';
import { Heading } from '@components/ui/Heading';
import { AUTH_MODE, HOME_WELCOME_MESSAGE, HOME_WELCOME_MESSAGE_WITH_AUTH, HOME_WELCOME_TITLE } from '@constants';
import { useAuth } from '@hooks';

import styles from './styles.module.css';

const { SIGN_IN, SIGN_UP } = AUTH_MODE;

export const Home: FC = () => {
  const [authMode, setAuthMode] = useState(SIGN_IN);
  const { user } = useAuth();

  const handleOnClickAuthButton = () => {
    setAuthMode(authMode === SIGN_IN ? SIGN_UP : SIGN_IN);
  };

  return (
    <article className={styles.wrapper}>
      <Heading
        title={HOME_WELCOME_TITLE}
        message={!user.id ? HOME_WELCOME_MESSAGE : HOME_WELCOME_MESSAGE_WITH_AUTH}
        icon={welcomeIcon}
      />

      <div className={styles.auth}>
        {!user.id && (
          <>
            {authMode === SIGN_IN && <SignInForm className={styles.form} />}

            {authMode === SIGN_UP && <SignUpForm className={styles.form} />}

            <p className={styles.linkBar}>
              Don't have an account?&nbsp;
              <span className={styles.authButton} onClick={handleOnClickAuthButton}>
                {authMode === SIGN_IN ? 'Sign up' : 'Sign in'}
              </span>
            </p>
          </>
        )}

        {user.id && <SignOutForm />}
      </div>
    </article>
  );
};
