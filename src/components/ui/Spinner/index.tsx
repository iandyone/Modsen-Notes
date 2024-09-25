import classNames from 'classnames';
import { FC } from 'react';

import styles from './styles.module.css';
import { SpinerProps } from './types';

export const Spinner: FC<SpinerProps> = ({ size, color = 'white' }) => (
  <div
    className={classNames(styles.loader, {
      [styles.small]: size === 's',
      [styles.large]: size === 'l',
      [styles.white]: color === 'white',
      [styles.blue]: color === 'blue',
    })}
  />
);
