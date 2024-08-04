import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { API_QUERY_KEYS, BASE_URL } from '@constants';

export const useRemoveNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteID: number) => {
      try {
        const { data } = await axios.delete(BASE_URL, {
          data: { id: noteID },
        });

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: API_QUERY_KEYS.allNotes });
    },
  });
};
