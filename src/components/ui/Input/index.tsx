import { Field } from 'formik';
import { FC } from 'react';

import styles from './styles.module.css';
import { InputProps } from './types';

export const Input: FC<InputProps> = ({ type, name, placeholder }) => {
  return <Field className={styles.input} type={type} name={name} placeholder={placeholder} />;
};
