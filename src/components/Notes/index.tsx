import cn from 'classnames';
import { FC } from 'react';

import notesIcon from '@assets/icons/notes.svg';
import { Note } from '@components/Note';
import { Heading } from '@components/ui/Heading';
import { useGetAllNotesQuery } from '@query';

import styles from './styles.module.css';

export const Notes: FC = () => {
  const { data: notes } = useGetAllNotesQuery();
  const isNoteListEmpty = notes?.length === 0;

  return (
    <article
      className={cn(styles.wrapper, {
        [styles.notes]: !isNoteListEmpty,
        [styles.welcome]: isNoteListEmpty,
      })}
    >
      {isNoteListEmpty ? (
        <Heading
          title="Add your first note"
          subtitle='To create a note please click the "Add a note" button below'
          icon={notesIcon}
        />
      ) : (
        <>{notes && notes.map((note) => <Note key={note.timestamp} {...note} />)}</>
      )}
    </article>
  );
};
