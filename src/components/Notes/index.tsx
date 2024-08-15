import cn from 'classnames';
import { FC, useCallback, useRef, useState } from 'react';

import notesIcon from '@assets/notes.svg';
import { Note } from '@components/Note';
import { Error } from '@components/ui/Error';
import { Heading } from '@components/ui/Heading';
import { Spinner } from '@components/ui/Spinner';
import { useSearch } from '@context';
import { useMutationObserver, useScrollAndFocus } from '@hooks';
import { useGetNotesQuery } from '@query';

import styles from './styles.module.css';

export const Notes: FC = () => {
  const [addedNode, setAddedNode] = useState<HTMLElement | null>(null);

  const { data: notes, isLoading, isError } = useGetNotesQuery();
  const { searchValue } = useSearch();

  const containerRef = useRef<HTMLDivElement>(null);
  const isNoteListEmpty = notes?.length === 0;

  const handleMutations = useCallback((mutationRecords: MutationRecord[]) => {
    const mutations = mutationRecords.filter(({ addedNodes }) => addedNodes.length);

    if (mutations.length > 1) {
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

  useMutationObserver(containerRef, handleMutations);
  useScrollAndFocus(addedNode, containerRef);

  return (
    <article
      id="notes-container"
      ref={containerRef}
      className={cn(styles.wrapper, {
        [styles.notes]: !isNoteListEmpty,
        [styles.welcome]: isNoteListEmpty,
        [styles.loader]: isLoading || isError,
      })}
    >
      {isError && <Error />}

      {isLoading && <Spinner size="l" />}

      {notes && (
        <>
          {isNoteListEmpty && searchValue && (
            <Heading title="There is no notes" subtitle="Try to change the search term" withAnimation />
          )}

          {isNoteListEmpty && !searchValue ? (
            <Heading
              title="Add your first note"
              subtitle='To create a note please click the "Add a note" button below'
              icon={notesIcon}
            />
          ) : (
            <>{notes && notes!.map((note) => <Note key={note.id} {...note} />)}</>
          )}
        </>
      )}
    </article>
  );
};
