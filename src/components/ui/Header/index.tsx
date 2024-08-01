import { FC } from 'react';

import logo from '@assets/icons/logo.svg';
import { ROUTES } from '@constants';
import { Button } from '@ui/Button';

import styles from './styles.module.css';

export const Header: FC = () => (
  <header className={styles.header}>
    <img src={logo} alt="logo" />

    <div className={styles.linkContainer}>
      {ROUTES.map(({ route, title }) => (
        <Button key={route} type="route" route={route} content={title} />
      ))}
    </div>
  </header>
);
