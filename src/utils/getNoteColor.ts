import { Colors, NOTE_COLOR_BY_ORDER_DATA } from '@constants';

export const getNoteColor = (lastNoteColor: string) => {
  return NOTE_COLOR_BY_ORDER_DATA[lastNoteColor as Colors] ?? Colors.GREEN_LIGHT;
};
