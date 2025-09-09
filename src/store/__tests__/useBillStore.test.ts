import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { TAB_VALUES } from '@/constants';
import { BILL_STATUSES } from '@/schemas/bill.schema';
import { mockBills } from '@/test/utils/testProviders';

import { useBillStore } from '../useBillStore';

describe('useBillStore', () => {
  const mockBill = mockBills[0];

  beforeEach(() => {
    useBillStore.setState({
      selectedBill: null,
      activeTab: TAB_VALUES.ALL,
      filter: { status: BILL_STATUSES.CURRENT },
      pagination: { page: 0, pageSize: 10 }
    });
  });

  it('should have correct initial state', () => {
    const { result } = renderHook(() => useBillStore());

    expect(result.current.selectedBill).toBeNull();
    expect(result.current.activeTab).toBe(TAB_VALUES.ALL);
    expect(result.current.filter.status).toBe(BILL_STATUSES.CURRENT);
    expect(result.current.pagination.page).toBe(0);
  });

  it('should set selected bill', () => {
    const { result } = renderHook(() => useBillStore());

    act(() => {
      result.current.setSelectedBill(mockBill);
    });

    expect(result.current.selectedBill).toEqual(mockBill);
  });

  it('should change active tab', () => {
    const { result } = renderHook(() => useBillStore());

    act(() => {
      result.current.setActiveTab(TAB_VALUES.FAVOURITES);
    });

    expect(result.current.activeTab).toBe(TAB_VALUES.FAVOURITES);
  });

  it('should set page', () => {
    const { result } = renderHook(() => useBillStore());

    act(() => {
      result.current.setPage(5);
    });

    expect(result.current.pagination.page).toBe(5);
  });

  it('should set status filter and reset page', () => {
    const { result } = renderHook(() => useBillStore());

    act(() => {
      result.current.setPage(3);
    });

    act(() => {
      result.current.setStatusFilter(BILL_STATUSES.REJECTED);
    });

    expect(result.current.filter.status).toBe(BILL_STATUSES.REJECTED);
    expect(result.current.pagination.page).toBe(0);
  });
});
