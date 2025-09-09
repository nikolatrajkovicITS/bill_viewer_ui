export const TAB_VALUES = {
  ALL: 'all',
  FAVOURITES: 'favourites'
} as const;

export type TabValue = (typeof TAB_VALUES)[keyof typeof TAB_VALUES];
