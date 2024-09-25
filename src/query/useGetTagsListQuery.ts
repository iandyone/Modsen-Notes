/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosApiError, Tag } from 'types';

import { API_QUERY_KEYS, PAGES, STORAGE_KEYS, TOAST_MESSAGES } from '@constants';
import { useToast } from '@context';
import { useAuth } from '@hooks';
import { removeFromLocalStorage } from '@utils';

export const useGetTagsList = (tag?: string) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, setAuthDataHandler } = useAuth();

  return useQuery<Tag[], AxiosApiError>({
    queryKey: [...API_QUERY_KEYS.allTags, tag, user.id],

    queryFn: async () => {
      try {
        const params = tag
          ? {
              params: {
                tag,
              },
            }
          : {};

        const { data } = await $api.get<Tag[]>('/notes/tags', params);

        return data ?? [];
      } catch (error) {
        if (error instanceof AxiosError && error.response.status === 401) {
          showToast({
            message: TOAST_MESSAGES.UNAUTHORIZERD,
          });
          setAuthDataHandler(null);
          removeFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
          navigate(PAGES.HOME);

          return;
        }

        showToast({
          message: TOAST_MESSAGES.SOMETHING_WRONG,
        });

        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: false,
  });
};
