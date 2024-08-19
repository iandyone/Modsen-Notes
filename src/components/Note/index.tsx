import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { NoteData } from 'types';

import { ContextMenu } from '@components/ContextMenu';
import { TagsBar } from '@components/TagsBar';
import { TextArea } from '@components/ui/Textarea';
import { useContextMenu } from '@hooks/useContextMenu';
import { useOutsideClickMany } from '@hooks/useOutsideClickMany';
import { useRemoveNoteMutation, useUpdateNoteMutation, useUpdateNotesPositions } from '@query';

import styles from './styles.module.css';
import { NoteProps } from './types';

export const Note: FC<NoteProps> = ({ note, moveNote, index, notes }) => {
  const { id, title, description, color, tags, lastupdate, position } = note;

  const [heading, setHeading] = useState(title);
  const [noteDescription, setNoteDescription] = useState(description);

  const contextMenuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const { contextMenuConfig, setContextMenuConfig, handleOnOpenContextMenu, handleCloseContextMenu } = useContextMenu();
  const { mutate: updateNote } = useUpdateNoteMutation();
  const { mutate: removeNote } = useRemoveNoteMutation();
  const { mutate: updateNotesPositions } = useUpdateNotesPositions();

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

    const position = notes.find((note) => note.id === id)?.position;

    const updatedNoteData: Partial<NoteData> = {
      id,
      tags,
      position,
      description: noteDescription,
    };

    updateNote(updatedNoteData);
  }, [id, updateNote, noteDescription]);

  const handleOnClickColor = useCallback(
    (color: string) => {
      updateNote({
        id,
        color,
      });

      handleCloseContextMenu();
    },
    [id]
  );

  const handleOnClickRemoveButton = useCallback(() => {
    removeNote(id);
    handleCloseContextMenu();
  }, [id]);

  const [, drag] = useDrag({
    type: 'note',
    item: { id: note.id, index },
  });

  const [, drop] = useDrop({
    accept: 'note',
    hover: (item: { id: string; index: number }, monitor) => {
      if (!containerRef.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = containerRef.current.getBoundingClientRect();

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex > hoverIndex && hoverClientY >= hoverBoundingRect.bottom) {
        return;
      }

      moveNote(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },

    drop: (item: { id: string; index: number }, monitor) => {
      const didDrop = monitor.didDrop();

      if (!didDrop) {
        const notesOrder = notes.map(({ id, position }) => ({ id, position }));
        updateNotesPositions(notesOrder);
      }
    },
  });

  drag(drop(containerRef));

  useOutsideClickMany([contextMenuRef], () => setContextMenuConfig({ isVisible: false }));

  useEffect(() => {
    setNoteDescription(note.description);
  }, [note]);

  return (
    <article
      ref={containerRef}
      className={styles.wrapper}
      onContextMenu={handleOnOpenContextMenu}
      title="Right click to edit the note"
      style={{
        backgroundColor: color,
      }}
    >
      <input
        className={styles.heading}
        value={heading}
        maxLength={27}
        onChange={handleOnHeadingChange}
        onBlur={handleOnBlurHeading}
      />
      Position: {position}
      <TextArea
        content={noteDescription}
        tags={tags}
        onChange={handleOnChangeDescription}
        onBlur={handleOnBlurDescription}
      />
      <div className={styles.footer}>
        {withTags && <TagsBar tags={tags} note={note} />}
        <span className={styles.date}>{lastupdate}</span>
      </div>
      {contextMenuConfig.isVisible && (
        <ContextMenu
          type="note"
          ref={contextMenuRef}
          xOffSet={contextMenuConfig.xOffset}
          yOffSet={contextMenuConfig.yOffset}
          handleOnClickColor={handleOnClickColor}
          handleOnClickRemoveButton={handleOnClickRemoveButton}
        />
      )}
    </article>
  );
};
