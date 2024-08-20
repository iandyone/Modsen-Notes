/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { AxiosApiError, Tag } from 'types';

import { API_QUERY_KEYS, BASE_URL } from '@constants';

export const useGetTagsList = (tag?: string) => {
  return useQuery<Tag[], AxiosApiError>({
    queryKey: [...API_QUERY_KEYS.allTags, tag],
    queryFn: async () => {
      try {
        const params = tag
          ? {
              params: {
                tag,
              },
            }
          : {};

        const { data } = await axios.get<Tag[]>(BASE_URL + '/tags', params);

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
    enabled: false,
  });
};
