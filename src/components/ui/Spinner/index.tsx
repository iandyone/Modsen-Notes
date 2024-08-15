import classNames from 'classnames';
import { FC } from 'react';

import styles from './styles.module.css';
import { SpinerProps } from './types';

export const Spinner: FC<SpinerProps> = ({ size }) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.small]: size === 's',
        [styles.large]: size === 'l',
      })}
    />
  );
};
