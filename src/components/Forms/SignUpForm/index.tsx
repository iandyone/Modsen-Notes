import cn from 'classnames';
import { Formik } from 'formik';
import { useSignUpMutation } from 'query/useSignUpMutation';
import { FC } from 'react';

import styles from '../styles.module.css';
import { SignInFormProps, SignUpState } from '../types';

import { Button } from '@components/Button';
import { Input } from '@components/ui/Input';

const signInFormInitialValues: SignUpState = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
};

export const SignUpForm: FC<SignInFormProps> = ({ className = '' }) => {
  const { mutate: handleOnLogin } = useSignUpMutation();

  const handleOnSubmit = ({ username, email, password, passwordConfirm }: SignUpState) => {
    if (password === passwordConfirm) {
      handleOnLogin({ username, email, password });
    }
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
              <h2 className={styles.heading}>Sign up</h2>
              <div className={styles.inputWrapper}>
                <Input name="username" type="text" placeholder="Username" />
                <Input name="email" type="email" placeholder="Email" />
                <Input name="password" type="password" placeholder="Password" />
                <Input name="passwordConfirm" type="password" placeholder="Confirm password" />
              </div>
              <Button type="submit" content="Submit" className={styles.button} />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
