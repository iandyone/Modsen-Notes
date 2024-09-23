import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS } from '@constants';

type NoteDataPicked = Pick<NoteData, 'id' | 'position'>;

export const useUpdateNotesPositions = () => {
  const queryClient = useQueryClient();

  return useMutation<NoteData[], AxiosApiError, NoteDataPicked[]>({
    mutationFn: async (notes) => {
      try {
        const { data } = await $api.put('/notes', {
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
