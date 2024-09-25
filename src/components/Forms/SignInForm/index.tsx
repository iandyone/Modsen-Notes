import cn from 'classnames';
import { Formik } from 'formik';
import { FC } from 'react';
import { signInValidationSchema } from 'schemas';

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
  const { mutate: handleOnLogin, isPending, data } = useSignInMutation();

  const handleOnSubmit = ({ email, password }: SignInState) => {
    handleOnLogin({ email, password });
  };

  return (
    <div
      className={cn(styles.wrapper, {
        [className]: className,
      })}
    >
      <Formik
        initialValues={signInFormInitialValues}
        validationSchema={signInValidationSchema}
        onSubmit={handleOnSubmit}
        validateOnChange
      >
        {({ handleSubmit, errors, touched }) => {
          return (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.heading}>Sign in</h2>
              <div className={styles.inputWrapper}>
                <Input name="email" type="email" placeholder="Email" error={errors.email} touched={touched.email} />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  error={errors.password}
                  touched={touched.password}
                />
              </div>
              <Button type="submit" content="Submit" loaderSize="s" spinnerColor="blue" className={styles.button} />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
