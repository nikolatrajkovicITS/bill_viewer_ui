import type { ReactNode } from 'react';

import type { SortConfig } from '../../../types/sort.types';

export type ColumnConfig<RowType> = {
  readonly id: keyof RowType;
  readonly label: string;
  readonly width?: number | string;
  readonly sortable?: boolean;
  readonly render?: (row: RowType) => ReactNode;
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
  readonly columns: ColumnConfig<RowType>[];
  readonly rows: RowType[];
  readonly pagination?: PaginationConfig;
  readonly onRowClick?: (row: RowType) => void;
  readonly emptyState?: ReactNode;
  readonly sortable?: boolean;
  readonly defaultSort?: SortConfig<keyof RowType>;
  readonly onSort?: (sortConfig: SortConfig<keyof RowType>) => void;
};
