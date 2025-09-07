import { Chip } from '@mui/material';

import { COMMON_TEXT } from '../../../constants';
import { getStatusColor } from '../../../utils';

interface StatusChipProps {
  status: string;
}

export const StatusChip = ({ status }: StatusChipProps) => {
  if (status === COMMON_TEXT.NO_DATA) {
    return <span>{COMMON_TEXT.NO_DATA}</span>;
  }

  return (
    <Chip
      label={status}
      color={getStatusColor(status)}
      size="small"
      variant="filled"
      sx={{ fontWeight: 600, fontSize: '0.7rem' }}
    />
  );
};
