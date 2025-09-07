export const TABLE_CONFIG = {
  MAX_HEIGHT: 600,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25] as const,
  EMPTY_STATE_MESSAGE: 'No data available'
} as const;

export const COLUMN_WIDTHS = {
  BILL_NO: '100px',
  TYPE: '120px',
  STATUS: '140px',
  SPONSOR: '180px'
} as const;

export const COMMON_TEXT = {
  LOADING: 'Loading…',
  NO_DATA: '—',
  ERROR_PREFIX: 'Error: '
} as const;
