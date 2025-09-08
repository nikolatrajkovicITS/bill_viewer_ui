import { create } from 'zustand';

import { BILL_STATUSES } from '../schemas/bill.schema';
import type { BillType } from '../types/bill.type';

type BillId = string;
type FilterState = {
  status: BillType;
};

type PaginationState = {
  page: number;
  pageSize: number;
};

type BillStore = {
  favourites: Record<BillId, boolean>;
  filter: FilterState;
  pagination: PaginationState;
  setStatusFilter: (status: BillType) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export const useBillStore = create<BillStore>((set) => ({
  favourites: {},
  filter: { status: BILL_STATUSES.CURRENT },
  pagination: { page: 0, pageSize: 10 },

  setStatusFilter: (status) =>
    set((state) => ({
      filter: { ...state.filter, status },
      pagination: { ...state.pagination, page: 0 }
    })),

  clearFilters: () => set({ filter: { status: BILL_STATUSES.CURRENT } }),

  setPage: (page) =>
    set((state) => ({
      pagination: { ...state.pagination, page }
    })),

  setPageSize: (pageSize) =>
    set((state) => ({
      pagination: { ...state.pagination, pageSize, page: 0 }
    }))
}));
