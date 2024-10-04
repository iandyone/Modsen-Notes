import { STORAGE_KEYS } from '@constants';

export const saveToSessionStorage = (key: STORAGE_KEYS, value: string) => {
  return sessionStorage.setItem(key, value);
};

export const getFromSessionStorage = (key: STORAGE_KEYS) => {
  return sessionStorage.getItem(key);
};

export const removeFromSessionStorage = (key: STORAGE_KEYS) => {
  return sessionStorage.removeItem(key);
};
