export interface ButtonProps {
  content: string;
  type?: 'button' | 'route';
  icon?: string;
  alt?: string;
  route?: string;
  onClick?: () => void;
}
