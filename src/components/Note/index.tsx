import { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { NoteData } from 'types';

import { TagsBar } from '@components/TagsBar';
import { useRemoveNoteMutation, useUpdateNoteMutation } from '@query';
import { TextArea } from '@ui/Textarea';
import { getDataStringFromTimestamp } from '@utils';

import styles from './styles.module.css';

export const Note: FC<NoteData> = (note) => {
  const { id, title, description, color, tags, timestamp } = note;

  const [heading, setHeading] = useState(title);
  const [noteDescription, setNoteDescription] = useState(description);

  const { mutate: updateNote } = useUpdateNoteMutation();
  const { mutate: removeNote } = useRemoveNoteMutation();

  const date = useMemo(() => getDataStringFromTimestamp(timestamp), [timestamp]);
  const withTags = tags.length > 0;

  const handleOnHeadingChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setHeading(event.target.value);
  }, []);

  const handleOnChangeDescription = useCallback((description: string) => {
    setNoteDescription(description);
  }, []);

  const handleOnBlurHeading = useCallback(() => {
    const updatedNoteData: Partial<NoteData> = {
      id: id,
      title: heading,
    };

    updateNote(updatedNoteData);
  }, [id, heading, updateNote]);

  const handleOnBlurDescription = useCallback(() => {
    const tagsList = noteDescription.split(/(\s+|\n)/).filter((tag) => tag.startsWith('#') && tag.length > 1);
    const tags = Array.from(new Set(tagsList));

    const updatedNoteData: Partial<NoteData> = {
      id,
      tags,
      description: noteDescription,
    };

    updateNote(updatedNoteData);
  }, [id, updateNote, noteDescription]);

  const handleOnRightClickNote = (event: MouseEvent<HTMLElement>) => {
    removeNote(id);
    event.preventDefault();
  };

  useEffect(() => {
    setNoteDescription(note.description);
  }, [note]);

  return (
    <article
      className={styles.wrapper}
      style={{
        backgroundColor: color,
      }}
      onContextMenu={handleOnRightClickNote}
    >
      <input
        className={styles.heading}
        value={heading}
        maxLength={27}
        onChange={handleOnHeadingChange}
        onBlur={handleOnBlurHeading}
      />

      <TextArea
        content={noteDescription}
        tags={tags}
        onChange={handleOnChangeDescription}
        onBlur={handleOnBlurDescription}
      />

      <div className={styles.footer}>
        {withTags && <TagsBar tags={tags} note={note} />}
        <span className={styles.date}>{date}</span>
      </div>
    </article>
  );
};
