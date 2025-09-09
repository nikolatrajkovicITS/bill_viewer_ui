import { useMemo, useState } from 'react';

import { Paper, Table, TableContainer } from '@mui/material';

import {
  CustomTableBody,
  CustomTableFooter,
  CustomTableHeader,
  type CustomTableProps
} from '@/components/ui/CustomTable';
import { SORT_DIRECTIONS, TABLE_CONFIG } from '@/constants';
import type { SortConfig } from '@/types/sort.types';
import { applySorting, createSortConfig, toggleSortDirection } from '@/utils';


export const CustomTable = <RowType,>({
  columns,
  rows,
  pagination,
  onRowClick,
  emptyState,
  sortable = false,
  defaultSort,
  onSort,
  isLoading = false,
  skeletonRows = 10
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
          <CustomTableHeader
            columns={columns}
            sortable={sortable}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <CustomTableBody
            columns={columns}
            rows={sortedRows}
            emptyState={emptyState}
            onRowClick={onRowClick}
            isLoading={isLoading}
            skeletonRows={skeletonRows}
          />
        </Table>
      </TableContainer>
      <CustomTableFooter pagination={pagination} />
    </Paper>
  );
};
