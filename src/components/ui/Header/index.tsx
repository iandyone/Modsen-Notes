import cn from 'classnames';
import { FC } from 'react';

import logo from '@assets/logo.svg';
import { Button } from '@components/Button';
import { ROUTES } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useResize } from '@hooks/useResize';

import styles from './styles.module.css';

const MOBILE_BREACKPOINT = 645;

export const Header: FC = () => {
  const [innerWidth] = useResize();
  const {
    user: { accessToken },
  } = useAuth();

  const isRoutesVisible = accessToken || innerWidth > 800;

  const isLogoVisible = innerWidth >= MOBILE_BREACKPOINT || !accessToken;

  return (
    <header
      className={cn(styles.header, {
        [styles.unauth]: !accessToken && innerWidth < 800,
      })}
    >
      {isLogoVisible && <img src={logo} alt="logo" />}

      {isRoutesVisible && (
        <div className={styles.linkContainer}>
          {ROUTES.map(({ route, title }) => (
            <Button
              key={route}
              className={styles.route}
              route={route}
              type="route"
              variant="secondary"
              content={title}
            />
          ))}
        </div>
      )}
    </header>
  );
};
