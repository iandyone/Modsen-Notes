import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NoteData, Tag } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';

export const useGetNotesQuery = (tag: Tag = '') => {
  return useQuery({
    queryKey: API_QUERY_KEYS.allNotes,
    queryFn: async () => {
      try {
        const params = tag
          ? {
              params: {
                tag,
              },
            }
          : {};

        const { data } = await axios.get<NoteData[]>(BASE_URL, params);

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
