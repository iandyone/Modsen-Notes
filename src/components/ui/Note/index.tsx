import { ChangeEvent, FC, useMemo, useState } from 'react';
import { NoteData } from 'types';

import { TextArea } from '@ui/Textarea';
import { formatTagString, getDataStringFromTimestamp } from '@utils';

import styles from './styles.module.css';

export const Note: FC<NoteData> = ({ title, description, color, tags, timestamp }) => {
  const withTags = tags.length > 0;
  const date = useMemo(() => getDataStringFromTimestamp(timestamp), [timestamp]);
  const [heading, setHeading] = useState(title ?? 'Новая заметка');

  const handleOnHeadingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeading(event.target.value);
  };

  const handleOnBlurHeading = () => {
    if (!heading) {
      setHeading('Новая заметка');
    }
  };

  return (
    <article
      className={styles.wrapper}
      style={{
        backgroundColor: color,
      }}
    >
      <input
        className={styles.heading}
        value={heading ?? 'Новая заметка'}
        maxLength={27}
        onChange={handleOnHeadingChange}
        onBlur={handleOnBlurHeading}
      />

      <TextArea content={description} />

      <div className={styles.footer}>
        {withTags && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span>{formatTagString(tag)}</span>
            ))}
          </div>
        )}
        <span className={styles.date}>{date}</span>
      </div>
    </article>
  );
};
