import cn from 'classnames';
import { Formik } from 'formik';
import { FC } from 'react';

import styles from '../styles.module.css';
import { SignInFormProps, SignInState } from '../types';

import { Button } from '@components/Button';
import { Input } from '@components/ui/Input';
import { useSignInMutation } from '@query';

const signInFormInitialValues: SignInState = {
  email: '',
  password: '',
};

export const SignInForm: FC<SignInFormProps> = ({ className = '' }) => {
  const { mutate: handleOnLogin, isPending } = useSignInMutation();

  const handleOnSubmit = ({ email, password }: SignInState) => {
    handleOnLogin({ email, password });
  };

  return (
    <div
      className={cn(styles.wrapper, {
        [className]: className,
      })}
    >
      <Formik initialValues={signInFormInitialValues} onSubmit={handleOnSubmit}>
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.heading}>Sign in</h2>
              <div className={styles.inputWrapper}>
                <Input name="email" type="email" placeholder="Email" />
                <Input name="password" type="password" placeholder="Password" />
              </div>
              <Button
                type="submit"
                content="Submit"
                isLoading={isPending}
                withContent={!isPending}
                loaderSize="s"
                spinnerColor="blue"
                className={styles.button}
              />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
