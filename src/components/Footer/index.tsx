import { FC } from 'react';

import { Button } from '../ui/Button';

import addIcon from '@assets/icons/plus.svg';
import { Search } from '@components/Search';
import { COLORS } from '@constants';
import { useCreateNoteMutation, useGetAllNotesQuery } from '@query';
import { getNoteColor } from '@utils';

import styles from './styles.module.css';

export const Footer: FC = () => {
  const { mutate: createNote } = useCreateNoteMutation();
  const { data: notes } = useGetAllNotesQuery();

  const handleOnButtonClick = () => {
    const lastNoteColor = notes?.at(-1)?.color ?? COLORS.GREEN_LIGHT;

    createNote(getNoteColor(lastNoteColor));
  };

  return (
    <footer className={styles.wrapper}>
      <Search />
      <Button icon={addIcon} alt="add note" content="Add a note" onClick={handleOnButtonClick} />
    </footer>
  );
};
