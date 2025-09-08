import type { ReactNode } from 'react';

import type { SortConfig } from '../../../types/sort.types';

export type ColumnConfig<RowType> = {
  id: keyof RowType;
  label: string;
  width?: number | string;
  sortable?: boolean;
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
  sortable?: boolean;
  defaultSort?: SortConfig<keyof RowType>;
  onSort?: (sortConfig: SortConfig<keyof RowType>) => void;
  isLoading?: boolean;
  skeletonRows?: number;
};
