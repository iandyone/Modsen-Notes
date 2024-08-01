import { FC } from 'react';

import searchIcon from '@assets/icons/search.svg';

import styles from './styles.module.css';

export const Search: FC = () => {
  return (
    <form className={styles.wrapper}>
      <img className={styles.icon} src={searchIcon} alt="search icon" />
      <input className={styles.input} placeholder="Search tags..." type="text" />
    </form>
  );
};
