import { FC } from 'react';

import { Heading } from '@components/ui/Heading';

import styles from './styles.module.css';

export const Error: FC = () => (
  <article className={styles.wrapper}>
    <Heading title="Something went wrong..." subtitle='Please go to the "Notes" and try again' />
  </article>
);
