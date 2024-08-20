import { COLORS, NOTES_COLOR } from '@constants';

export const getNoteColor = (lastNoteColor: string) => {
  return NOTES_COLOR[lastNoteColor as COLORS] ?? COLORS.GREEN_LIGHT;
};
