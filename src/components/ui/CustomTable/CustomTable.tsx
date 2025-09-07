import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import { COMMON_TEXT, TABLE_CONFIG } from '../../../constants';
import type { CustomTableProps } from './CustomTable.types';

export const CustomTable = <RowType,>({
  columns,
  rows,
  pagination,
  onRowClick,
  emptyState
}: CustomTableProps<RowType>) => {
  return (
    <Paper elevation={0}>
      <TableContainer
        sx={{ maxHeight: TABLE_CONFIG.MAX_HEIGHT, overflow: 'auto' }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.id)} style={{ width: col.width }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  {emptyState ?? COMMON_TEXT.NO_DATA}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, idx) => (
                <TableRow
                  key={idx}
                  hover
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <TableCell key={String(col.id)}>
                      {col.render
                        ? col.render(row)
                        : String(row[col.id] ?? COMMON_TEXT.NO_DATA)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
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
        />
      )}
    </Paper>
  );
};
