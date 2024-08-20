import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';
import { useSearch } from '@context';

export const useRemoveNoteMutation = () => {
  const queryClient = useQueryClient();
  const { searchValue } = useSearch();

  return useMutation<NoteData, AxiosApiError, number>({
    mutationFn: async (noteID) => {
      try {
        const { data } = await axios.delete(BASE_URL, {
          data: { id: noteID },
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
