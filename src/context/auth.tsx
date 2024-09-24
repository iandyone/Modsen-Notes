import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from 'react';
import { UserCredentialsData } from 'types';

interface AuthContextState {
  user: UserCredentialsData;
  setAuthDataHandler: Dispatch<SetStateAction<UserCredentialsData>>;
}

const authContext = createContext({} as AuthContextState);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authData, setAuthDataHandler] = useState({} as UserCredentialsData);

  const values = useMemo(
    () => ({
      user: { ...authData },
      setAuthDataHandler,
    }),
    [authData]
  );

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export const useAuthContext = () => useContext(authContext);
