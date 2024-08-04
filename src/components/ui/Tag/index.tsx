import { FC } from 'react';

import { formatTagString } from '@utils';

import styles from './styles.module.css';
import { TagProps } from './types';

export const Tag: FC<TagProps> = ({ tag, onClick }) => {
  const handleOnClickTag = () => onClick(tag);

  return (
    <span key={tag} className={styles.tag} onClick={handleOnClickTag}>
      {formatTagString(tag)}
    </span>
  );
};
