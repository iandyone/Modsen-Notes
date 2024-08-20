import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import searchIcon from '@assets/search.svg';
import { useSearch } from '@context';

import styles from './styles.module.css';

export const Search: FC = () => {
  const { searchValue, setSearchValue } = useSearch();

  const [value, setValue] = useState(searchValue);

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchValue(value);
  };

  useEffect(() => {
    if (!searchValue) {
      setValue('');
    }
  }, [searchValue]);

  return (
    <form className={styles.wrapper} onSubmit={handleOnSubmit}>
      <img className={styles.icon} src={searchIcon} alt="search icon" />
      <input
        className={styles.input}
        placeholder="Search tags..."
        value={value}
        onChange={handleOnChangeInput}
        type="text"
      />
    </form>
  );
};
