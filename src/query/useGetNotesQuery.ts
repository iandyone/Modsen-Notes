/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';
import { useSearch } from '@context';

export const useGetNotesQuery = () => {
  const { searchValue: tag } = useSearch();

  return useQuery<NoteData[], AxiosApiError>({
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
        if (error instanceof AxiosError) {
          return Promise.reject(error.response?.data);
        }

        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
