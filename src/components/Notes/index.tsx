import { NOTES } from 'constants/notes';

import cn from 'classnames';
import { FC } from 'react';

import notesIcon from '@assets/icons/notes.svg';
import { Heading } from '@components/ui/Heading';
import { Note } from '@components/ui/Note';

import styles from './styles.module.css';

export const Notes: FC = () => {
  const isNoteListEmpty = NOTES.length === 0;

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
        <>
          {NOTES.map((note) => (
            <Note key={note.timestamp} {...note} />
          ))}
        </>
      )}
    </article>
  );
};
