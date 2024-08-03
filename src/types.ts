export interface StylesProps {
  [key: string]: string;
}

export interface NoteData {
  title?: string;
  description: string;
  tags: Tag[];
  timestamp: number;
  order: number;
  color: string;
}

export type Tag = string;
