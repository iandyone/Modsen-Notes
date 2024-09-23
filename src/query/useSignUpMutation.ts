import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { SignUpPayload, UserCredentialsData } from 'types';

import { PAGES, STORAGE_KEYS } from '@constants';
import { saveToLocalStorage } from '@utils';

export const useSignUpMutation = () => {
  const navigate = useNavigate();

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
        if (error instanceof AxiosError) {
          return Promise.reject(error.response?.data);
        }

        return Promise.reject(error);
      }
    },
    onSuccess(data) {
      saveToLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      navigate(PAGES.NOTES);
    },
  });
};
