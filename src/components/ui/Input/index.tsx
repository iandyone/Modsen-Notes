import cn from 'classnames';
import { Field } from 'formik';
import { FC } from 'react';

import styles from './styles.module.css';
import { InputProps } from './types';

export const Input: FC<InputProps> = ({ type, name, placeholder, error, touched }) => {
  const isError = error && touched;
  const isCorrect = !error && touched;

  return (
    <div className={styles.inputWrapper}>
      <Field
        className={cn(styles.input, {
          [styles.inputError]: isError,
          [styles.inputCorrect]: isCorrect,
        })}
        type={type}
        name={name}
        placeholder={placeholder}
      />

      {isError && <span className={styles.error}>{error}</span>}
    </div>
  );
};
