import { FC } from 'react';

import styles from './styles.module.css';
import { HeadingProps } from './types';

export const Heading: FC<HeadingProps> = ({ title, subtitle, icon }) => {
  return (
    <section className={styles.wrapper}>
      {icon && <img src={icon} alt="title icon" />}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
};
