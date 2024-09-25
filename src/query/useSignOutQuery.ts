/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosApiError, SignOutResponse } from 'types';

import { PAGES, STORAGE_KEYS } from '@constants';
import { useAuth } from '@hooks';
import { removeFromLocalStorage } from '@utils';

export const useSignOutQuery = () => {
  const navigate = useNavigate();
  const { user, setAuthDataHandler } = useAuth();

  return useQuery<SignOutResponse, AxiosApiError>({
    queryKey: [user.id],

    queryFn: async () => {
      try {
        const { data } = await $api.get('/auth/signout');

        return data ?? {};
      } catch (error) {
        return Promise.reject(error);
      } finally {
        setAuthDataHandler(null);
        removeFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
        navigate(PAGES.HOME);
      }
    },
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });
};
