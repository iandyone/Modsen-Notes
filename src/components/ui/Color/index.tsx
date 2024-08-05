import { FC } from 'react';

import styles from './styles.module.css';
import { ColorProps } from './types';

export const Color: FC<ColorProps> = ({ color, onClick }) => {
  const handleOnClickColor = () => onClick(color);

  return <span className={styles.color} style={{ backgroundColor: color }} onClick={handleOnClickColor} />;
};
