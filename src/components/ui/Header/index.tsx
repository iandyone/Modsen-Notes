import { FC } from 'react';

import logo from '@assets/logo.svg';
import { Button } from '@components/Button';
import { ROUTES } from '@constants';
import { useResize } from '@hooks/useResize';

import styles from './styles.module.css';

const MOBILE_BREACKPOINT = 645;

export const Header: FC = () => {
  const [innerWidth] = useResize();

  return (
    <header className={styles.header}>
      {innerWidth >= MOBILE_BREACKPOINT && <img src={logo} alt="logo" />}

      <div className={styles.linkContainer}>
        {ROUTES.map(({ route, title }) => (
          <Button key={route} className={styles.route} route={route} type="route" variant="secondary" content={title} />
        ))}
      </div>
    </header>
  );
};
