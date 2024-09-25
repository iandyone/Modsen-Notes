import cn from 'classnames';
import { FC, useCallback, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { Spinner } from '../ui/Spinner';

import { ContextMenu } from '@components/ContextMenu';
import { useContextMenu } from '@hooks/useContextMenu';
import { useOutsideClickMany } from '@hooks/useOutsideClickMany';
import { useCreateNoteMutation } from '@query';

import styles from './styles.module.css';
import { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  withContent = true,
  loaderSize = 's',
  spinnerColor,
  route = '/',
  content,
  icon,
  alt,
  isLoading,
  onClick,
  className = '',
  withContextMenu = false,
}) => {
  const { contextMenuConfig, setContextMenuConfig, handleCloseContextMenu, handleOnOpenContextMenu } = useContextMenu();
  const { mutate: createNote } = useCreateNoteMutation();
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClickMany([contextMenuRef], () => setContextMenuConfig({ isVisible: false }));

  const handleOnClickColor = useCallback((color: string) => {
    createNote(color);
    handleCloseContextMenu();
  }, []);

  const handleOnClickButton = () => {
    if (!isLoading && onClick) {
      onClick();
    }
  };

  if (type === 'route') {
    return (
      <NavLink
        to={route}
        className={({ isActive }) =>
          cn(styles.button, {
            [className]: className,
            [styles.variantSecondary]: variant === 'secondary',
            [styles.active]: isActive,
          })
        }
      >
        {!isLoading && icon && <img src={icon} alt={alt} />}

        {content}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      onClick={handleOnClickButton}
      onContextMenu={handleOnOpenContextMenu}
      disabled={isLoading}
      className={cn(styles.button, {
        [className]: className,
        [styles.variantPrimary]: variant === 'primary',
        [styles.disabled]: isLoading,
      })}
    >
      {isLoading && <Spinner size={loaderSize} color={spinnerColor} />}

      {!isLoading && icon && <img src={icon} alt={alt} />}

      {withContent && content}

      {withContextMenu && contextMenuConfig.isVisible && (
        <ContextMenu
          className={styles.contextMenu}
          ref={contextMenuRef}
          type="button"
          handleOnClickColor={handleOnClickColor}
        />
      )}
    </button>
  );
};
