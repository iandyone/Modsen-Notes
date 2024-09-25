export enum PAGES {
  HOME = '/home',
  NOTES = '/notes',
}

export const ROUTES = [
  { route: PAGES.HOME, title: 'Home' },
  { route: PAGES.NOTES, title: 'Notes' },
];

export enum AUTH_MODE {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}
