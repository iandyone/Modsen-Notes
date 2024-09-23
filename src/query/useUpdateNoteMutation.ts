import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS } from '@constants';
import { useSearch } from '@context';

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();
  const { searchValue } = useSearch();

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
        if (error instanceof AxiosError) {
          return Promise.reject(error.response?.data);
        }

        return Promise.reject(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...API_QUERY_KEYS.allNotes, searchValue] });
    },
  });
};
