import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { Header } from '@components/ui/Header';
import { PATHS } from '@constants';

import styles from './styles.module.css';

export const Layout: FC = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      {pathname === PATHS.NOTES && <Footer />}
    </div>
  );
};
