import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS, PAGES, STORAGE_KEYS } from '@constants';
import { useSearch } from '@context';
import { removeFromLocalStorage } from '@utils';

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();
  const { searchValue } = useSearch();
  const navigate = useNavigate();

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
          removeFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
          navigate(PAGES.HOME);
        }

        return Promise.reject(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...API_QUERY_KEYS.allNotes, searchValue] });
    },
  });
};
