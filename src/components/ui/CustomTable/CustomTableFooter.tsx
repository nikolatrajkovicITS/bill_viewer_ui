import { Box, TablePagination } from '@mui/material';

import { TABLE_CONFIG } from '../../../constants';
import type { PaginationConfig } from './CustomTable.types';

type CustomTableFooterProps = {
  readonly pagination?: PaginationConfig;
};

export const CustomTableFooter = ({ pagination }: CustomTableFooterProps) => {
  if (!pagination) return null;

  return (
    <Box
      sx={{
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#fafbfc'
      }}
    >
      <TablePagination
        component="div"
        count={pagination.totalCount}
        page={pagination.page}
        rowsPerPage={pagination.pageSize}
        onPageChange={(_, newPage) => pagination.onPageChange(newPage)}
        onRowsPerPageChange={(e) =>
          pagination.onPageSizeChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={
          pagination.rowsPerPageOptions ?? TABLE_CONFIG.PAGE_SIZE_OPTIONS
        }
        showFirstButton
        showLastButton
      />
    </Box>
  );
};
