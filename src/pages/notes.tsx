import { FC, useLayoutEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';

import { Notes } from '@components/Notes';
import { PAGES, STORAGE_KEYS } from '@constants';
import { getFromLocalStorage } from '@utils';

export const NotesPage: FC = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const accessToken = getFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);

    if (!accessToken) {
      navigate(PAGES.HOME);
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Notes />
    </DndProvider>
  );
};
