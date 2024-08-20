export interface ButtonProps {
  content?: string;
  type?: 'button' | 'route';
  icon?: string;
  alt?: string;
  route?: string;
  isLoading?: boolean;
  loaderSize?: 's' | 'l';
  onClick?: () => void;
  withContextMenu?: boolean;
  className?: string;
}
