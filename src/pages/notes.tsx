import { FC, useLayoutEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';

import { Notes } from '@components/Notes';
import { PAGES } from '@constants';
import { useAuth } from '@hooks';

export const NotesPage: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useLayoutEffect(() => {
    if (!user.id) {
      navigate(PAGES.HOME);
    }
  }, [user]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Notes />
    </DndProvider>
  );
};
