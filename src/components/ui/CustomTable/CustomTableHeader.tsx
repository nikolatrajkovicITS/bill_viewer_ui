import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, TableCell, TableHead, TableRow } from '@mui/material';

import { SORT_DIRECTIONS } from '@/constants';
import type { SortConfig } from '@/types/sort.types';

import type { ColumnConfig } from './CustomTable.types';

type CustomTableHeaderProps<RowType> = {
  columns: ColumnConfig<RowType>[];
  sortable: boolean;
  sortConfig: SortConfig<keyof RowType> | null;
  onSort: (columnId: keyof RowType) => void;
};

export const CustomTableHeader = <RowType,>({
  columns,
  sortable,
  sortConfig,
  onSort
}: CustomTableHeaderProps<RowType>) => {
  return (
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
            onClick={() => col.sortable && onSort(col.id as keyof RowType)}
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
  );
};
