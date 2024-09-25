import { jwtDecode } from 'jwt-decode';
import { useLayoutEffect } from 'react';
import { UserCredentialsData } from 'types';

import { STORAGE_KEYS } from '@constants';
import { useAuthContext } from '@context';
import { getFromSessionStorage } from '@utils';

export const useAuth = () => {
  const { user, setAuthDataHandler } = useAuthContext();

  useLayoutEffect(() => {
    const accessToken = getFromSessionStorage(STORAGE_KEYS.ACCESS_TOKEN);

    if (!accessToken) {
      setAuthDataHandler(null);
    }

    if (accessToken && !user.id) {
      const { id, email, username } = jwtDecode<UserCredentialsData>(accessToken);
      setAuthDataHandler({ id, email, username, accessToken });
    }
  }, [user]);

  return { user, setAuthDataHandler };
};
