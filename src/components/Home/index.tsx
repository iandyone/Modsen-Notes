import { FC } from 'react';

import welcomeIcon from '@assets/icons/welcome.svg';
import { Heading } from '@components/ui/Heading';

import styles from './styles.module.css';

export const Home: FC = () => (
  <article className={styles.wrapper}>
    <Heading
      title="Welcome to notes"
      subtitle='Please go to the "Notes" page to manage your notes'
      icon={welcomeIcon}
    />
  </article>
);
