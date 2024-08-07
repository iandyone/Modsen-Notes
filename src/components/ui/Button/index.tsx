import cn from 'classnames';
import { FC, useCallback, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { ContextMenu } from '@components/ContextMenu';
import { useContextMenu } from '@hooks/useContextMenu';
import { useOutsideClickMany } from '@hooks/useOutsideClickMany';
import { useCreateNoteMutation } from '@query';

import styles from './styles.module.css';
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({
  type = 'button',
  route = '/',
  content,
  icon,
  alt,
  onClick,
  withContextMenu = false,
}) => {
  const { contextMenuConfig, setContextMenuConfig, handleCloseContextMenu, handleOnRightClickNote } = useContextMenu();
  const { mutate: createNote } = useCreateNoteMutation();
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClickMany([contextMenuRef], () => setContextMenuConfig({ isVisible: false }));

  const handleOnClickColor = useCallback((color: string) => {
    createNote(color);
    handleCloseContextMenu();
  }, []);

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
    <div
      className={cn(styles.button, {
        [styles.action]: type === 'button',
      })}
      onClick={onClick}
      onContextMenu={handleOnRightClickNote}
    >
      {icon && <img src={icon} alt={alt} />}
      {content}
      {withContextMenu && contextMenuConfig.isVisible && (
        <ContextMenu ref={contextMenuRef} type="button" handleOnClickColor={handleOnClickColor} />
      )}
    </div>
  );
};
