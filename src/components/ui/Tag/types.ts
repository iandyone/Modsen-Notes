import { Tag } from 'types';

export interface TagProps {
  tag: Tag;
  onClick: (tag: Tag) => void;
}
