export type SortDirection = 'asc' | 'desc';

export type SortConfig<T = string> = {
  readonly key: T;
  readonly direction: SortDirection;
};

export type SortableColumnConfig<RowType> = {
  readonly id: keyof RowType;
  readonly label: string;
  readonly width?: string;
  readonly sortable?: boolean;
  readonly render?: (row: RowType) => React.ReactNode;
};

export type SortHandlers<T = string> = {
  readonly onSort: (key: T) => void;
  readonly sortConfig: SortConfig<T> | null;
};

export type SortCompareFn<T> = (a: T, b: T) => number;
