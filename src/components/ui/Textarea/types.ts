import { Tag } from 'types';

export interface TextAreaProps {
  content: string;
  onChange: (content: string) => void;
  onBlur: () => void;
  tags: Tag[];
}
