import { FC, useCallback } from 'react';

import { Button } from '../Button';

import addIcon from '@assets/plus.svg';
import { Search } from '@components/Search';
import { COLORS } from '@constants';
import { useSearch } from '@context';
import { useResize } from '@hooks/useResize';
import { useCreateNoteMutation, useGetNotesQuery } from '@query';
import { getNoteColor } from '@utils';

import styles from './styles.module.css';

const BUTTON_MOBILE_BREAKPOINT = 645;

export const Footer: FC = () => {
  const { mutate: createNote, isPending: isNoteCreation } = useCreateNoteMutation();
  const { data: notes, isLoading: isNotesLoading, isRefetching: isNotesRefetchich } = useGetNotesQuery();
  const { setSearchValue } = useSearch();
  const [viewportWidth] = useResize();

  const buttonContent = viewportWidth > BUTTON_MOBILE_BREAKPOINT ? 'Add a note' : '';
  const isLoading = isNotesLoading || isNoteCreation || isNotesRefetchich;

  const handleOnButtonClick = useCallback(() => {
    const lastNoteColor = notes?.at(-1)?.color ?? COLORS.GREEN_LIGHT;
    setSearchValue('');

    createNote(getNoteColor(lastNoteColor));
  }, [notes]);

  return (
    <footer className={styles.wrapper}>
      <Search />
      <Button
        icon={addIcon}
        alt="add note"
        content={buttonContent}
        isLoading={isLoading}
        onClick={handleOnButtonClick}
        className={styles.button}
        loaderSize="s"
        withContextMenu
      />
    </footer>
  );
};
