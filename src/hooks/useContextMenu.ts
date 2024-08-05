import { MouseEvent, useCallback, useState } from 'react';

import { contextMenuInitialState } from '@constants';

export const useContextMenu = () => {
  const [contextMenuConfig, setContextMenuConfig] =
    useState<Partial<typeof contextMenuInitialState>>(contextMenuInitialState);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenuConfig({ ...contextMenuConfig, isVisible: false });
  }, [contextMenuConfig]);

  const handleOnRightClickNote = (event: MouseEvent<HTMLElement>) => {
    setContextMenuConfig({ isVisible: true, xOffset: event.clientX, yOffset: event.clientY });
    event.preventDefault();
    event.stopPropagation();
  };

  return { contextMenuConfig, setContextMenuConfig, handleCloseContextMenu, handleOnRightClickNote };
};
