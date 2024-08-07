import cn from 'classnames';
import { FC, useCallback, useRef, useState } from 'react';

import notesIcon from '@assets/icons/notes.svg';
import { Note } from '@components/Note';
import { Heading } from '@components/ui/Heading';
import { useSearch } from '@context';
import { useMutationObserver, useScrollAndFocus } from '@hooks';
import { useGetNotesQuery } from '@query';

import styles from './styles.module.css';

export const Notes: FC = () => {
  const [addedNode, setAddedNode] = useState<HTMLElement | null>(null);
  const { searchValue } = useSearch();
  const { data: notes } = useGetNotesQuery();

  const isNoteListEmpty = notes?.length === 0;
  const containerRef = useRef<HTMLDivElement>(null);

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
      })}
    >
      {isNoteListEmpty && searchValue && (
        <Heading title="There is no notes founded" subtitle="Please try to change the filter" />
      )}
      {isNoteListEmpty && !searchValue ? (
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
