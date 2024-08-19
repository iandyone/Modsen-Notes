import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { NoteData } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';
import { useSearch } from '@context';

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();
  const { searchValue } = useSearch();

  return useMutation({
    mutationFn: async (note: Partial<NoteData>) => {
      try {
        const noteData = { ...note };
        delete noteData.position;

        const { data } = await axios.patch(BASE_URL, {
          note: {
            ...noteData,
          },
        });

        return data;
      } catch (error) {
        Promise.reject(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...API_QUERY_KEYS.allNotes, searchValue] });
    },
  });
};
