import cn from 'classnames';
import { FC } from 'react';

import styles from './styles.module.css';
import { HeadingProps } from './types';

export const Heading: FC<HeadingProps> = ({
  title,
  message,
  icon,
  withAnimation,
  messageClassName = '',
  className = '',
}) => {
  return (
    <section
      className={cn(styles.wrapper, {
        [className]: className,
      })}
    >
      {withAnimation && (
        <div className={styles.errorWrapper}>
          <span className={styles.errorPicture} />
        </div>
      )}

      {icon && <img className={styles.icon} src={icon} alt="heading icon" />}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {message && (
          <p
            className={cn(styles.message, {
              [messageClassName]: messageClassName,
            })}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};
