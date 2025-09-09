import type { ReactNode } from 'react';

import { Box } from '@mui/material';


type BillModalTabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

export const BillModalTabPanel = ({
  children,
  value,
  index
}: BillModalTabPanelProps) => {
  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`bill-tabpanel-${index}`}
      aria-labelledby={`bill-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </Box>
  );
};
