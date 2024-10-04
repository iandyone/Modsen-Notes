import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS, PAGES, STORAGE_KEYS, TOAST_MESSAGES } from '@constants';
import { useSearch, useToast } from '@context';
import { removeFromSessionStorage } from '@utils';

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { searchValue } = useSearch();
  const { showToast } = useToast();

  return useMutation<NoteData, AxiosApiError, Partial<NoteData>>({
    mutationFn: async (note) => {
      try {
        const noteData = { ...note };
        delete noteData.position;

        const { data } = await $api.patch('/notes', {
          note: {
            ...noteData,
          },
        });

        return data;
      } catch (error) {
        if (error instanceof AxiosError && error.response.status === 401) {
          showToast({
            message: TOAST_MESSAGES.UNAUTHORIZERD,
          });
          removeFromSessionStorage(STORAGE_KEYS.ACCESS_TOKEN);
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
