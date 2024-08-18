import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { NoteData } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';

export const useUpdateNotesPositions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notes: Pick<NoteData, 'id' | 'position'>[]) => {
      try {
        const { data } = await axios.put(BASE_URL, {
          notes,
        });

        return data;
      } catch (error) {
        Promise.reject(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...API_QUERY_KEYS.allNotes] });
    },
  });
};
