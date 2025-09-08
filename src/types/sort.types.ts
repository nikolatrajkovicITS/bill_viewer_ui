export type SortDirection = 'asc' | 'desc';

export type SortConfig<T = string> = {
  key: T;
  direction: SortDirection;
};

export type SortableColumnConfig<RowType> = {
  id: keyof RowType;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (row: RowType) => React.ReactNode;
};

export type SortHandlers<T = string> = {
  onSort: (key: T) => void;
  sortConfig: SortConfig<T> | null;
};

export type SortCompareFn<T> = (a: T, b: T) => number;
