export interface ButtonProps {
  content?: string;
  view?: 'button' | 'route';
  type?: 'button' | 'submit';
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
