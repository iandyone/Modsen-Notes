import { ChangeEvent, FC } from 'react';

import searchIcon from '@assets/icons/search.svg';
import { useSearch } from '@context';
import { useGetNotesQuery } from '@query';

import styles from './styles.module.css';

export const Search: FC = () => {
  const { searchValue, setSearchValue } = useSearch();
  const { refetch } = useGetNotesQuery(searchValue);

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <form
      className={styles.wrapper}
      onSubmit={(e) => {
        e.preventDefault();

        refetch();
      }}
    >
      <img className={styles.icon} src={searchIcon} alt="search icon" />
      <input
        className={styles.input}
        placeholder="Search tags..."
        value={searchValue}
        onChange={handleOnChangeInput}
        type="text"
      />
    </form>
  );
};
