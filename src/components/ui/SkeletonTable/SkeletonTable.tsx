import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';

import type { ColumnConfig } from '../CustomTable/CustomTable.types';

type SkeletonTableProps<RowType> = {
  columns: ColumnConfig<RowType>[];
  rows?: number;
};

export const SkeletonTable = <RowType,>({
  columns,
  rows = 10
}: SkeletonTableProps<RowType>) => (
  <TableBody>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {columns.map((_, colIndex) => (
          <TableCell key={colIndex}>
            <Skeleton
              variant="text"
              width={
                colIndex === 0
                  ? '60%'
                  : colIndex === columns.length - 1
                    ? '90%'
                    : '80%'
              }
              height={20}
              animation="wave"
            />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);
