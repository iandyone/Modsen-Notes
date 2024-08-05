export interface ContextMenuProps {
  xOffSet?: number;
  yOffSet?: number;
  type: 'note' | 'button';
  handleOnClickColor: (color: string) => void;
  handleOnClickRemoveButton?: () => void;
}
