import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Tag } from 'types';

import searchIcon from '@assets/search.svg';
import clearIcon from '@assets/x-mark.svg';
import { TagsMenu } from '@components/ui/TagsMenu';
import { useSearch } from '@context';
import { useDebounce } from '@hooks/useDebounce';
import { useOutsideClickMany } from '@hooks/useOutsideClickMany';
import { useGetTagsList } from '@query';

import styles from './styles.module.css';

export const Search: FC = () => {
  const { searchValue, setSearchValue } = useSearch();

  const [inputValue, setInputValue] = useState(searchValue);
  const [showTagsList, setShowTagsList] = useState(false);

  const tag = useDebounce(inputValue);

  const { data: tags, refetch: getTagsList, isLoading: isTagsLoading } = useGetTagsList(tag);

  const containerRef = useRef<HTMLFormElement>(null);
  const tagsListRef = useRef<HTMLDivElement>(null);

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    if (!showTagsList) {
      setShowTagsList(true);
    }
  };

  const handleOnFocusInput = () => {
    getTagsList();
    setShowTagsList(true);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchValue(inputValue);
    setShowTagsList(false);
  };

  const handleOnClickClearButton = () => {
    setSearchValue('');
    setInputValue('');
    setShowTagsList(false);
  };

  const handleOnClickTag = useCallback((tag: Tag) => {
    setInputValue(tag);
    setSearchValue(tag);
    setShowTagsList(false);
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setInputValue('');
    }
  }, [searchValue]);

  useEffect(() => {
    if (showTagsList) {
      getTagsList();
    }
  }, [tag]);

  useOutsideClickMany<HTMLElement>([containerRef, tagsListRef], () => setShowTagsList(false));

  return (
    <>
      <form className={styles.wrapper} onSubmit={handleOnSubmit} ref={containerRef}>
        <img className={styles.icon} src={searchIcon} alt="search icon" />
        <input
          className={styles.input}
          placeholder="Search tags..."
          value={inputValue}
          onChange={handleOnChangeInput}
          onFocus={handleOnFocusInput}
          type="text"
        />
        <img
          src={clearIcon}
          alt="clear search icon"
          className={styles.clearButton}
          onClick={handleOnClickClearButton}
        />
      </form>
      {showTagsList && (
        <TagsMenu tags={tags ?? []} onClickTag={handleOnClickTag} isLoading={isTagsLoading} ref={tagsListRef} />
      )}
    </>
  );
};
