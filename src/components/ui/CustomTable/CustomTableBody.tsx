import { TableBody, TableCell, TableRow } from '@mui/material';

import { COMMON_TEXT } from '../../../constants';
import type { ColumnConfig } from './CustomTable.types';

type CustomTableBodyProps<RowType> = {
  readonly columns: ColumnConfig<RowType>[];
  readonly rows: RowType[];
  readonly emptyState?: React.ReactNode;
  readonly onRowClick?: (row: RowType) => void;
};

export const CustomTableBody = <RowType,>({
  columns,
  rows,
  emptyState,
  onRowClick
}: CustomTableBodyProps<RowType>) => {
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
      ))}
    </TableBody>
  );
};
