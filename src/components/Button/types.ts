export interface ButtonProps {
  content?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'route';
  spinnerColor?: 'white' | 'blue';
  icon?: string;
  alt?: string;
  route?: string;
  isLoading?: boolean;
  loaderSize?: 's' | 'l';
  onClick?: () => void;
  withContextMenu?: boolean;
  withContent?: boolean;
  className?: string;
}
