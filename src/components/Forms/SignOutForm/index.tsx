import { FC } from 'react';

import styles from '../styles.module.css';
import { SignInFormProps } from '../types';

import exitIcon from '@assets/exit.svg';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { useSignOutQuery } from '@query';

export const SignOutForm: FC<SignInFormProps> = () => {
  const { refetch: signOut, isLoading } = useSignOutQuery();
  const { user } = useAuth();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Modsen Notes</h2>

      <div className={styles.subheading}>
        <h4 className={styles.subtitle}>Profile: </h4>
        <p className={styles.user}>{user.email}</p>
      </div>

      <Button
        className={styles.signOutButton}
        content="Sign out"
        variant="secondary"
        icon={exitIcon}
        onClick={signOut}
        isLoading={isLoading}
      />
    </div>
  );
};
