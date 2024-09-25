import axios, { InternalAxiosRequestConfig } from 'axios';

import { BASE_URL, STORAGE_KEYS } from '@constants';
import { getFromLocalStorage, saveToLocalStorage } from '@utils';

export const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = getFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const config = error.config;

    if (error.response?.status === 401 && !config.wasRefreshed) {
      config.wasRefreshed = true;

      try {
        const { data } = await axios.get<{ accessToken: string }>(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });

        saveToLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);

        return $api.request(config);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
