/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosApiError } from 'types';

import { PAGES, STORAGE_KEYS } from '@constants';
import { useAuth } from '@hooks';
import { removeFromSessionStorage } from '@utils';

export const useSignOutQuery = () => {
  const navigate = useNavigate();
  const { user, setAuthDataHandler } = useAuth();

  return useQuery<boolean, AxiosApiError>({
    queryKey: [user.id],

    queryFn: async () => {
      try {
        $api.get('/auth/signout');

        return true;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        setAuthDataHandler(null);
        removeFromSessionStorage(STORAGE_KEYS.ACCESS_TOKEN);
        navigate(PAGES.HOME);
      }
    },
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });
};
