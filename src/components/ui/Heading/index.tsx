import { FC } from 'react';

import styles from './styles.module.css';
import { HeadingProps } from './types';

export const Heading: FC<HeadingProps> = ({ title, subtitle, icon, withAnimation }) => {
  return (
    <section className={styles.wrapper}>
      {withAnimation && (
        <div className={styles.errorWrapper}>
          <span className={styles.errorPicture} />
        </div>
      )}

      {icon && <img className={styles.icon} src={icon} alt="heading icon" />}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
};
