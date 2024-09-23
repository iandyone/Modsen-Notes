export const saveToLocalStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
