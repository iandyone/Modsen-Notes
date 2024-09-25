export interface InputProps {
  type: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
}
