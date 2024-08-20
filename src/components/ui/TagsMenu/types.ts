import { Tag } from 'types';

export interface TagsBarProps {
  tags: Tag[];
  isLoading: boolean;
  onClickTag: (tag: Tag) => void;
}
