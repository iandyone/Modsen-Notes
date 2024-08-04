import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NoteData } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';

export const useGetAllNotesQuery = () => {
  return useQuery({
    queryKey: API_QUERY_KEYS.allNotes,
    queryFn: async () => {
      try {
        const { data } = await axios.get<NoteData[]>(BASE_URL);

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
