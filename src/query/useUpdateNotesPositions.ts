import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { $api } from 'config/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosApiError, NoteData } from 'types';

import { API_QUERY_KEYS, PAGES, STORAGE_KEYS, TOAST_MESSAGES } from '@constants';
import { useToast } from '@context';
import { removeFromLocalStorage } from '@utils';

type NoteDataPicked = Pick<NoteData, 'id' | 'position'>;

export const useUpdateNotesPositions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

  return useMutation<NoteData[], AxiosApiError, NoteDataPicked[]>({
    mutationFn: async (notes) => {
      try {
        const { data } = await $api.put('/notes', {
          notes,
        });

        return data;
      } catch (error) {
        if (error instanceof AxiosError && error.response.status === 401) {
          showToast({
            message: TOAST_MESSAGES.UNAUTHORIZERD,
            settings: {
              type: 'error',
            },
          });
          removeFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
          navigate(PAGES.HOME);
        }

        return Promise.reject(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...API_QUERY_KEYS.allNotes] });
    },
  });
};
