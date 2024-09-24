import { ToastOptions } from 'react-toastify';

export interface StylesProps {
  [key: string]: string;
}

export interface NoteData {
  id: number;
  title?: string;
  description: string;
  tags: Tag[];
  lastupdate: string;
  position: number;
  color: string;
}

export interface AxiosApiError {
  message: string;
  error: string;
}

export type Tag = string;

export interface SignInPayload {
  email: string;
  password: string;
}

export interface UserCredentialsData {
  id: number;
  email: string;
  username: string;
  accessToken: string;
}

export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
}

export interface ToastContextValues {
  showToast: (params: { message: string | JSX.Element | null; settings?: ToastOptions }) => void;
}
