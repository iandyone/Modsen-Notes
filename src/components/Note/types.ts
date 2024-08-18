import { NoteData } from 'types';

export interface NoteProps {
  note: NoteData;
  notes: NoteData[];
  index: number;
  moveNote: (dragIndex: number, hoverIndex: number) => void;
}
