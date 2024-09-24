import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from 'react';
import { UserCredentialsData } from 'types';

interface AuthContextState extends UserCredentialsData {
  setAuthDataHandler: Dispatch<SetStateAction<UserCredentialsData>>;
}

const authContext = createContext({} as AuthContextState);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authData, setAuthDataHandler] = useState({} as UserCredentialsData);

  const values = useMemo(
    () => ({
      ...authData,
      setAuthDataHandler,
    }),
    [authData]
  );

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
