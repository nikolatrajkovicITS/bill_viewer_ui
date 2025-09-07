export const BILL_STATUS_COLORS = {
  CURRENT: 'success',
  ENACTED: 'primary',
  WITHDRAWN: 'error',
  DEFEATED: 'error',
  REJECTED: 'error',
  LAPSED: 'warning',
  DEFAULT: 'default'
} as const;

export type StatusColor =
  (typeof BILL_STATUS_COLORS)[keyof typeof BILL_STATUS_COLORS];

export const getStatusColor = (status: string): StatusColor => {
  const normalizedStatus =
    status.toUpperCase() as keyof typeof BILL_STATUS_COLORS;
  return BILL_STATUS_COLORS[normalizedStatus] || BILL_STATUS_COLORS.DEFAULT;
};
