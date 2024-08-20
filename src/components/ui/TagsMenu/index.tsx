import cn from 'classnames';
import { forwardRef } from 'react';

import { Spinner } from '../Spinner';

import styles from './styles.module.css';
import { TagsBarProps } from './types';

export const TagsMenu = forwardRef<HTMLDivElement, TagsBarProps>(({ tags, isLoading, onClickTag }, ref) => {
  const heading = tags.length > 0 && isLoading ? 'Available tags' : 'No tags found';

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.loader]: isLoading,
      })}
      ref={ref}
    >
      {isLoading ? (
        <Spinner size="l" />
      ) : (
        <>
          <h6 className={styles.heading}>{heading}</h6>
          {tags.map((tag) => (
            <div key={tag} className={styles.tag} onClick={() => onClickTag(tag)}>
              <span>#</span>
              {tag}
            </div>
          ))}
        </>
      )}
    </div>
  );
});
