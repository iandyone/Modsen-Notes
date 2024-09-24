import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { SignUpPayload, UserCredentialsData } from 'types';

import { PAGES, STORAGE_KEYS } from '@constants';
import { useAuth } from '@context';
import { removeFromLocalStorage, saveToLocalStorage } from '@utils';

export const useSignUpMutation = () => {
  const navigate = useNavigate();
  const { setAuthDataHandler } = useAuth();

  return useMutation<UserCredentialsData, AxiosError, SignUpPayload>({
    mutationFn: async ({ username, email, password }) => {
      try {
        const { data } = await $api.post('/auth/signup', {
          username,
          password,
          email,
        });

        return data;
      } catch (error) {
        if (error instanceof AxiosError && error.response.status === 401) {
          removeFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
          navigate(PAGES.HOME);
        }

        return Promise.reject(error);
      }
    },
    onSuccess(data) {
      setAuthDataHandler(data);
      saveToLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      navigate(PAGES.NOTES);
    },
    onError() {
      setAuthDataHandler(null);
    },
  });
};
