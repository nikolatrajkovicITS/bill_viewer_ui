import { create } from 'zustand';

import { TAB_VALUES, type TabValue } from '@/constants';
import { BILL_STATUSES } from '@/schemas/bill.schema';
import type { BillModel, BillType } from '@/types/bill.type';

type FilterState = {
  status: BillType;
};

type PaginationState = {
  page: number;
  pageSize: number;
};

type BillStore = {
  selectedBill: BillModel | null;
  activeTab: TabValue;
  filter: FilterState;
  pagination: PaginationState;
  setStatusFilter: (status: BillType) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSelectedBill: (bill: BillModel) => void;
  setActiveTab: (tab: TabValue) => void;
};

export const useBillStore = create<BillStore>((set) => ({
  selectedBill: null,
  activeTab: TAB_VALUES.ALL,
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
    })),

  setSelectedBill: (bill) => set({ selectedBill: bill }),

  setActiveTab: (tab) => set({ activeTab: tab })
}));
