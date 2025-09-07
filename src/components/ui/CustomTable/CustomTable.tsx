import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import { useMemo, useState } from 'react';

import { COMMON_TEXT, SORT_DIRECTIONS, TABLE_CONFIG } from '../../../constants';
import type { SortConfig } from '../../../types/sort.types';
import {
  applySorting,
  createSortConfig,
  toggleSortDirection
} from '../../../utils';
import type { CustomTableProps } from './CustomTable.types';

export const CustomTable = <RowType,>({
  columns,
  rows,
  pagination,
  onRowClick,
  emptyState,
  sortable = false,
  defaultSort,
  onSort
}: CustomTableProps<RowType>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<
    keyof RowType
  > | null>(defaultSort || null);

  const handleSort = (columnId: keyof RowType) => {
    if (!sortable) return;

    const newSortConfig =
      sortConfig?.key === columnId
        ? createSortConfig(columnId, toggleSortDirection(sortConfig.direction))
        : createSortConfig(columnId, SORT_DIRECTIONS.ASC);

    setSortConfig(newSortConfig);
    onSort?.(newSortConfig);
  };

  const sortedRows = useMemo(() => {
    if (!sortable || !sortConfig) return rows;
    return applySorting(rows, sortConfig);
  }, [rows, sortConfig, sortable]);
  return (
    <Paper elevation={0}>
      <TableContainer
        sx={{ maxHeight: TABLE_CONFIG.MAX_HEIGHT, overflow: 'auto' }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.id)}
                  style={{ width: col.width }}
                  sx={{
                    cursor: sortable && col.sortable ? 'pointer' : 'default',
                    userSelect: 'none'
                  }}
                  onClick={() => col.sortable && handleSort(col.id)}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    {col.label}
                    {sortable && col.sortable && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        sx={{ minWidth: 16 }}
                      >
                        <ArrowUpward
                          fontSize="small"
                          sx={{
                            fontSize: 14,
                            opacity:
                              sortConfig?.key === col.id &&
                              sortConfig?.direction === SORT_DIRECTIONS.ASC
                                ? 1
                                : 0.3,
                            transition: 'opacity 0.2s'
                          }}
                        />
                        <ArrowDownward
                          fontSize="small"
                          sx={{
                            fontSize: 14,
                            opacity:
                              sortConfig?.key === col.id &&
                              sortConfig?.direction === SORT_DIRECTIONS.DESC
                                ? 1
                                : 0.3,
                            transition: 'opacity 0.2s',
                            mt: -0.5
                          }}
                        />
                      </Box>
                    )}
                  </Box>
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
              sortedRows.map((row, idx) => (
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
