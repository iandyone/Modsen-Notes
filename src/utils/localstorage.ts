export const saveToSessionStorage = (key: string, value: string) => {
  return sessionStorage.setItem(key, value);
};

export const getFromSessionStorage = (key: string) => {
  return sessionStorage.getItem(key);
};

export const removeFromSessionStorage = (key: string) => {
  return sessionStorage.removeItem(key);
};
