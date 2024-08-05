import { forwardRef, MouseEvent } from 'react';

import { Button } from '@components/ui/Button';
import { Color } from '@components/ui/Color';
import { COLORS } from '@constants';

import styles from './styles.module.css';
import { ContextMenuProps } from './types';

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ type, xOffSet = 0, yOffSet = 0, handleOnClickColor, handleOnClickRemoveButton }, ref) => {
    const handleOnContextContainerClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    };

    return (
      <div
        ref={ref}
        className={styles.wrapper}
        style={{
          left: xOffSet,
          top: yOffSet,
        }}
        onClick={handleOnContextContainerClick}
      >
        <div className={styles.palette}>
          {Object.values(COLORS).map((color) => (
            <Color key={color} color={color} onClick={handleOnClickColor} />
          ))}
        </div>
        {type === 'note' && <Button content="Remove note" onClick={handleOnClickRemoveButton} />}
      </div>
    );
  }
);
