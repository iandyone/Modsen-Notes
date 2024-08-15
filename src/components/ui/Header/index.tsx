import { FC } from 'react';

import logo from '@assets/logo.svg';
import { Button } from '@components/ui/Button';
import { ROUTES } from '@constants';

import styles from './styles.module.css';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />

      <div className={styles.linkContainer}>
        {ROUTES.map(({ route, title }) => (
          <Button key={route} className={styles.route} type="route" route={route} content={title} />
        ))}
      </div>
    </header>
  );
};
