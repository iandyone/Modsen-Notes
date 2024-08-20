import cn from 'classnames';
import { forwardRef, useMemo } from 'react';

import { Spinner } from '../Spinner';

import styles from './styles.module.css';
import { TagsBarProps } from './types';

export const TagsMenu = forwardRef<HTMLDivElement, TagsBarProps>(({ tags, isLoading, onClickTag }, ref) => {
  const heading = useMemo(() => {
    return !isLoading && tags.length > 0 ? 'Available tags' : 'No tags found';
  }, [isLoading, tags]);

  return (
    <div
      ref={ref}
      className={cn(styles.wrapper, {
        [styles.loader]: isLoading,
      })}
    >
      {isLoading && tags ? (
        <Spinner size="l" />
      ) : (
        <>
          <h6 className={styles.heading}>{heading}</h6>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <div key={tag} className={styles.tag} onClick={() => onClickTag(tag)}>
                <span>#</span>
                {tag}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
});
