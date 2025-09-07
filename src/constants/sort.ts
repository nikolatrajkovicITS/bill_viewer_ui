export const SORT_DIRECTIONS = {
  ASC: 'asc' as const,
  DESC: 'desc' as const
} as const;

export const SORT_CONFIG = {
  DEFAULT_DIRECTION: SORT_DIRECTIONS.ASC,
  TOGGLE_DIRECTIONS: [SORT_DIRECTIONS.ASC, SORT_DIRECTIONS.DESC] as const
} as const;

export const SORT_ICONS = {
  ASC: 'ArrowUpward',
  DESC: 'ArrowDownward'
} as const;

export type SortDirectionType =
  (typeof SORT_DIRECTIONS)[keyof typeof SORT_DIRECTIONS];
