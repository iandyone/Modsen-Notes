export interface StylesProps {
  [key: string]: string;
}

export interface NoteData {
  id: number;
  title?: string;
  description: string;
  tags: Tag[];
  lastupdate: string;
  position: number;
  color: string;
}

export type Tag = string;
