export interface ContextMenuProps {
  xOffSet?: number;
  yOffSet?: number;
  type: 'note' | 'button';
  className?: string;
  handleOnClickColor: (color: string) => void;
  handleOnClickRemoveButton?: () => void;
}
