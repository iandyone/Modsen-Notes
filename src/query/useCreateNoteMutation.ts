import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';
import { useSearch } from '@context';

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();
  const { searchValue } = useSearch();

  return useMutation<NoteData, AxiosApiError, string>({
    mutationFn: async (color) => {
      try {
        const { data } = await axios.post<NoteData>(BASE_URL, {
          color,
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
