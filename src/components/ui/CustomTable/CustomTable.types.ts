import type { ReactNode } from 'react';

export type ColumnConfig<RowType> = {
  id: keyof RowType;
  label: string;
  width?: number | string;
  render?: (row: RowType) => ReactNode;
};

export type PaginationConfig = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  rowsPerPageOptions?: number[];
};

export type CustomTableProps<RowType> = {
  columns: ColumnConfig<RowType>[];
  rows: RowType[];
  pagination?: PaginationConfig;
  onRowClick?: (row: RowType) => void;
  emptyState?: ReactNode;
};
