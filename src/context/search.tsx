import { createContext, PropsWithChildren, SetStateAction, useContext, useMemo, useState, Dispatch } from 'react';

interface SearchContextInitialValue {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const searchContext = createContext({} as SearchContextInitialValue);

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
