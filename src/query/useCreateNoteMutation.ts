import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS, PAGES, STORAGE_KEYS, TOAST_MESSAGES } from '@constants';
import { useSearch, useToast } from '@context';
import { removeFromLocalStorage } from '@utils';

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();
  const { searchValue } = useSearch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  return useMutation<NoteData, AxiosApiError, string>({
    mutationFn: async (color) => {
      try {
        const { data } = await $api.post<NoteData>('/notes', {
          color,
        });

        return data;
      } catch (error) {
        if (error instanceof AxiosError && error.response.status === 401) {
          showToast({
            message: TOAST_MESSAGES.UNAUTHORIZERD,
          });
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...API_QUERY_KEYS.allNotes, searchValue] });
    },
  });
};
