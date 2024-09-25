export const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080';

export const API_QUERY_KEYS = {
  allNotes: ['notes', 'all'],
  allTags: ['tags', 'all'],
};

export enum STORAGE_KEYS {
  ACCESS_TOKEN = 'accessToken',
}
