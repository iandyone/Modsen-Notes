import cn from 'classnames';
import { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteData } from 'types';

import notesIcon from '@assets/notes.svg';
import { Note } from '@components/Note';
import { Error } from '@components/ui/Error';
import { Heading } from '@components/ui/Heading';
import { Spinner } from '@components/ui/Spinner';
import { PAGES, TOAST_MESSAGES } from '@constants';
import { useIsDragging, useSearch } from '@context';
import { useMutationObserver, useScrollAndFocus } from '@hooks';
import { useAuth } from '@hooks';
import { useGetNotesQuery } from '@query';

import styles from './styles.module.css';

export const Notes: FC = () => {
  const [addedNode, setAddedNode] = useState<HTMLElement | null>(null);

  const { data: notesData, isLoading, isError } = useGetNotesQuery();
  const { user } = useAuth();
  const { searchValue } = useSearch();
  const navigate = useNavigate();
  const { isDragging } = useIsDragging();
  const [notes, setNotes] = useState<NoteData[]>(notesData ?? []);

  const containerRef = useRef<HTMLDivElement>(null);
  const isNoteListEmpty = notes?.length === 0;

  const handleMutations = useCallback((mutationRecords: MutationRecord[]) => {
    const mutations = mutationRecords.filter(({ addedNodes }) => addedNodes.length);

    if (mutations.length > 1 || isDragging) {
      return;
    }

    mutations.forEach(({ addedNodes }) => {
      if (addedNodes.length === 1) {
        const addedNode = addedNodes[0] as HTMLElement;

        if (addedNode) {
          setAddedNode(addedNode);
        }
      }
    });
  }, []);

  const moveNote = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedNotes = [...notes];
      const [movedNote] = updatedNotes.splice(dragIndex, 1);
      updatedNotes.splice(hoverIndex, 0, movedNote);

      setNotes(
        updatedNotes
          .map((note, index) => ({
            ...note,
            position: index + 1,
          }))
          .sort((a, b) => a.position - b.position)
      );
    },
    [notes]
  );

  useMutationObserver(containerRef, handleMutations);
  useScrollAndFocus(containerRef, addedNode);
  useAuth();

  useLayoutEffect(() => {
    if (notesData) {
      setNotes(notesData);
    }
  }, [notesData]);

  useEffect(() => {
    if (isError && !user.id) {
      navigate(PAGES.HOME);
    }
  }, [isError, user]);

  return (
    <div className={styles.wrapper}>
      <article
        id="notes-container"
        ref={containerRef}
        className={cn(styles.article, {
          [styles.notes]: !isNoteListEmpty,
          [styles.welcome]: isNoteListEmpty,
          [styles.loader]: isLoading || isError,
        })}
      >
        {isLoading && <Spinner size="l" />}

        {isError && !isLoading && <Error message={TOAST_MESSAGES.SOMETHING_WRONG} />}

        {notes && !isLoading && !isError && (
          <>
            {isNoteListEmpty && searchValue && !isLoading && (
              <Heading
                title="There is no notes"
                message="Please try to change the search term"
                messageClassName={styles.errorMessage}
                withAnimation
              />
            )}

            {isNoteListEmpty && !searchValue && !isLoading ? (
              <Heading
                title="Add your first note"
                message='To create a note please click the "Add a note" button below'
                icon={notesIcon}
              />
            ) : (
              <>
                {notes.map((note, index) => (
                  <Note key={note.id} note={note} notes={notes} index={index} moveNote={moveNote} />
                ))}
              </>
            )}
          </>
        )}
      </article>
    </div>
  );
};
