/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NoteData } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';
import { useSearch } from '@context';

export const useGetNotesQuery = () => {
  const { searchValue: tag } = useSearch();

  return useQuery({
    queryKey: [...API_QUERY_KEYS.allNotes, tag],
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

        return data ?? [];
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
