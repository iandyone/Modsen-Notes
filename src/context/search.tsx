import { createContext, PropsWithChildren, SetStateAction, useContext, useMemo, useState, Dispatch } from 'react';

interface SearchContextInitialValue<T> {
  searchValue: T;
  setSearchValue: Dispatch<SetStateAction<T>>;
}

const searchContext = createContext({} as SearchContextInitialValue<string>);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const values = useMemo(
    () => ({
      searchValue,
      setSearchValue,
    }),
    [searchValue]
  );

  return <searchContext.Provider value={values}>{children}</searchContext.Provider>;
};

export const useSearch = () => useContext(searchContext);
