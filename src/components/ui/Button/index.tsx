import cn from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({ type = 'button', route = '/', content, icon, alt, onClick }) => {
  if (type === 'route') {
    return (
      <NavLink
        to={route}
        className={({ isActive }) =>
          cn(styles.button, {
            [styles.route]: type === 'route',
            [styles.active]: isActive,
          })
        }
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button
      type="button"
      className={cn(styles.button, {
        [styles.action]: type === 'button',
      })}
      onClick={onClick}
    >
      {icon && <img src={icon} alt={alt} />}
      {content}
    </button>
  );
};
