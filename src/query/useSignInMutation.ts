import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosApiError, UserCredentialsData, SignInPayload } from 'types';

import { PAGES, STORAGE_KEYS, TOAST_MESSAGES } from '@constants';
import { useToast } from '@context';
import { useAuth } from '@hooks';
import { removeFromSessionStorage, saveToSessionStorage } from '@utils';

const { INVALID_CREDENTIALS, SOMETHING_WRONG } = TOAST_MESSAGES;

export const useSignInMutation = () => {
  const navigate = useNavigate();
  const { setAuthDataHandler } = useAuth();
  const { showToast } = useToast();

  return useMutation<UserCredentialsData, AxiosApiError, SignInPayload>({
    mutationFn: async ({ email, password }) => {
      try {
        const { data } = await $api.post<UserCredentialsData>('/auth/signin', {
          email,
          password,
        });

        return data;
      } catch (error) {
        if (error instanceof AxiosError && error.response.status === 401) {
          showToast({
            message: INVALID_CREDENTIALS,
          });
          removeFromSessionStorage(STORAGE_KEYS.ACCESS_TOKEN);
          navigate(PAGES.HOME);

          return;
        }

        showToast({
          message: SOMETHING_WRONG,
        });

        return Promise.reject(error);
      }
    },
    onSuccess(data) {
      setAuthDataHandler(data);
      saveToSessionStorage(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      navigate(PAGES.NOTES);
    },

    onError() {
      setAuthDataHandler(null);
    },
  });
};
