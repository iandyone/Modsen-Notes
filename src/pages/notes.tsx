import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Notes } from '@components/Notes';

export const NotesPage: FC = () => (
  <>
    <DndProvider backend={HTML5Backend}>
      <Notes />
    </DndProvider>
  </>
);
