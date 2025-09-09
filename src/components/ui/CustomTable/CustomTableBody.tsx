import { TableBody, TableCell, TableRow } from '@mui/material';

import { SkeletonTable } from '@/components/ui';
import { COMMON_TEXT } from '@/constants';

import type { ColumnConfig } from './CustomTable.types';

type CustomTableBodyProps<RowType> = {
  columns: ColumnConfig<RowType>[];
  rows: RowType[];
  emptyState?: React.ReactNode;
  onRowClick?: (row: RowType) => void;
  isLoading?: boolean;
  skeletonRows?: number;
};

export const CustomTableBody = <RowType,>({
  columns,
  rows,
  emptyState,
  onRowClick,
  isLoading = false,
  skeletonRows = 10
}: CustomTableBodyProps<RowType>) => {
  if (isLoading) {
    return <SkeletonTable columns={columns} rows={skeletonRows} />;
  }

  if (rows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length}>
            {emptyState ?? COMMON_TEXT.NO_DATA}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((row, idx) => (
        <TableRow key={`${row}-${idx}`} hover onClick={() => onRowClick?.(row)}>
          {columns.map((col) => (
            <TableCell key={String(col.id)}>
              {col.render
                ? col.render(row)
                : String(row[col.id as keyof RowType] ?? COMMON_TEXT.NO_DATA)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
