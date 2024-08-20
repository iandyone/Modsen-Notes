import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';

type NoteDataPicked = Pick<NoteData, 'id' | 'position'>;

export const useUpdateNotesPositions = () => {
  const queryClient = useQueryClient();

  return useMutation<NoteData[], AxiosApiError, NoteDataPicked[]>({
    mutationFn: async (notes) => {
      try {
        const { data } = await axios.put(BASE_URL, {
          notes,
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
      queryClient.invalidateQueries({ queryKey: [...API_QUERY_KEYS.allNotes] });
    },
  });
};
