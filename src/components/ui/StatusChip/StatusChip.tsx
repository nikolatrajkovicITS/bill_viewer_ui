import { Chip } from '@mui/material';

import { COMMON_TEXT } from '@/constants';
import { getStatusColor } from '@/utils';

type StatusChipProps = {
  status: string;
};

export const StatusChip = ({ status }: StatusChipProps) => {
  if (status === COMMON_TEXT.NO_DATA) {
    return <span>{COMMON_TEXT.NO_DATA}</span>;
  }

  return (
    <Chip
      id="status-chip"
      label={status}
      color={getStatusColor(status)}
      size="small"
      variant="filled"
      sx={{ fontWeight: 600, fontSize: '0.7rem' }}
    />
  );
};
