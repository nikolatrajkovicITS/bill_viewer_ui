import { Box, TablePagination } from '@mui/material';

import type { PaginationConfig } from '@/components/ui/CustomTable';
import { TABLE_CONFIG } from '@/constants';

type CustomTableFooterProps = {
  pagination?: PaginationConfig;
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
