import { FC } from 'react';

import { Tag } from '../ui/Tag';

import { useUpdateNoteMutation } from '@query';
import { replaceTagWithString } from '@utils';

import styles from './styles.module.css';
import { TagsBarProps } from './types';

export const TagsBar: FC<TagsBarProps> = ({ tags, note }) => {
  const { mutate: updateNote } = useUpdateNoteMutation();

  const handleOnClickTag = (currentTag: string) => {
    const tagsList = tags.filter((tag) => tag !== currentTag);

    updateNote({
      id: note.id,
      tags: tagsList,
      description: replaceTagWithString(note.description, currentTag),
    });
  };

  return (
    <div className={styles.tagsBar}>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} onClick={handleOnClickTag} />
      ))}
    </div>
  );
};
