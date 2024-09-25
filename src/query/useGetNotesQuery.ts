/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS, PAGES, STORAGE_KEYS, TOAST_MESSAGES } from '@constants';
import { useSearch, useToast } from '@context';
import { useAuth } from '@hooks';
import { removeFromLocalStorage } from '@utils';

export const useGetNotesQuery = () => {
  const { searchValue: tag } = useSearch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, setAuthDataHandler } = useAuth();

  return useQuery<NoteData[], AxiosApiError>({
    queryKey: [...API_QUERY_KEYS.allNotes, tag, user.id],

    queryFn: async () => {
      try {
        const params = tag
          ? {
              params: {
                tag,
              },
            }
          : {};

        const { data } = await $api.get<NoteData[]>('/notes', params);

        return data ?? [];
      } catch (error) {
        if (error instanceof AxiosError && error.response.status === 401) {
          showToast({
            message: TOAST_MESSAGES.UNAUTHORIZERD,
            settings: {
              type: 'error',
            },
          });
          setAuthDataHandler(null);
          removeFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
          navigate(PAGES.HOME);
        }

        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });
};
