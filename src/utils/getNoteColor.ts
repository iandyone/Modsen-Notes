import { COLORS, NOTE_COLOR_BY_ORDER_DATA } from '@constants';

export const getNoteColor = (lastNoteColor: string) => {
  return NOTE_COLOR_BY_ORDER_DATA[lastNoteColor as COLORS] ?? COLORS.GREEN_LIGHT;
};
