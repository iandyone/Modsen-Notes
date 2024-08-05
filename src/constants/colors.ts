export enum COLORS {
  GREEN_LIGHT = '#e8fbfe',
  GREEN = '#ecfee8',
  PURPLE = '#ece8fe',
  PINK = '#fee8fa',
  ORANGE = '#ffee8e8f',
  YELLOW = '#fef4e8',
}

const { GREEN, GREEN_LIGHT, ORANGE, PINK, PURPLE, YELLOW } = COLORS;

export const NOTE_COLOR_BY_ORDER_DATA = {
  [GREEN_LIGHT]: GREEN,
  [GREEN]: PURPLE,
  [PURPLE]: PINK,
  [PINK]: ORANGE,
  [ORANGE]: YELLOW,
  [YELLOW]: GREEN_LIGHT,
};
