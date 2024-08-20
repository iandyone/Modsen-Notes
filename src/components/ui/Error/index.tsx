import { FC } from 'react';

import { Heading } from '@components/ui/Heading';

import styles from './styles.module.css';
import { ErrorProps } from './types';

export const Error: FC<ErrorProps> = ({ title = 'Something went wrong...', message = 'Please try again latter' }) => (
  <article className={styles.wrapper}>
    <Heading title={title} subtitle={message} withAnimation />
  </article>
);
