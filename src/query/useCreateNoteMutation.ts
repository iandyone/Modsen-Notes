import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { API_QUERY_KEYS, BASE_URL } from '@constants';

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      try {
        const { data } = await axios.post(BASE_URL, {
          color,
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
