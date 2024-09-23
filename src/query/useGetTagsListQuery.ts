/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { AxiosApiError, Tag } from 'types';

import { API_QUERY_KEYS } from '@constants';

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

        const { data } = await $api.get<Tag[]>('/notes/tags', params);

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
