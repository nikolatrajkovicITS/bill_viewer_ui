export const ERROR_MESSAGES = {
  DEFAULT: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Check your connection.',
  NOT_FOUND: 'Data not found.',
  SERVER_ERROR: 'Server error. Try again later.',
  UNAUTHORIZED: 'You are not authorized.',
  TIMEOUT: 'Request timed out. Please try again.',
  NO_DATA: 'No data available.'
} as const;

export const RETRY_BUTTON_TEXT = 'Try Again' as const;
