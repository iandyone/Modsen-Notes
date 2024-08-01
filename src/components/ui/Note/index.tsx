import { FC } from 'react';
import { NoteData } from 'types';

import { TextArea } from '@ui/Textarea';

import styles from './styles.module.css';

export const Note: FC<NoteData> = ({ title, description }) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.heading}>{title}</div>
      <TextArea content={description} />
    </article>
  );
};
