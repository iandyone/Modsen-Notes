import { FC } from 'react';

import { Button } from '../Button';

import addIcon from '@assets/icons/plus.svg';
import { Search } from '@components/Search';

import styles from './styles.module.css';

export const Footer: FC = () => {
  return (
    <footer className={styles.wrapper}>
      <Search />
      <Button icon={addIcon} alt="add note" content="New note" />
    </footer>
  );
};
