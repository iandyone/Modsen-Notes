import cn from 'classnames';
import { Formik } from 'formik';
import { useSignUpMutation } from 'query/useSignUpMutation';
import { FC } from 'react';
import { signUpValidationSchema } from 'schemas/sign-up-schema';

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
      <Formik
        initialValues={signInFormInitialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleOnSubmit}
        validateOnChange
      >
        {({ handleSubmit, errors, touched, handleBlur, values, setErrors }) => {
          return (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.heading}>Sign up</h2>
              <div className={styles.inputWrapper}>
                <Input
                  name="username"
                  type="text"
                  placeholder="Username"
                  error={errors.username}
                  touched={touched.username}
                />
                <Input name="email" type="email" placeholder="Email" error={errors.email} touched={touched.email} />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  error={errors.password}
                  touched={touched.password}
                />
                <Input
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm password"
                  error={errors.passwordConfirm}
                  touched={touched.passwordConfirm}
                />
              </div>
              <Button type="submit" content="Submit" className={styles.button} />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
