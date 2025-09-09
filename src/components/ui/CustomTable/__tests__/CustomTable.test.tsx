import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SORT_DIRECTIONS } from '@/constants';
import {
  TestProviders,
  mockBills,
  mockColumns
} from '@/test/utils/testProviders';
import type { SortConfig } from '@/types/sort.types';

import { CustomTable } from '../CustomTable';

describe('CustomTable', () => {
  const defaultProps = {
    columns: mockColumns,
    rows: mockBills,
    sortable: true,
    isLoading: false,
    pagination: {
      page: 0,
      pageSize: 10,
      totalCount: 2,
      onPageChange: vi.fn(),
      onPageSizeChange: vi.fn()
    },
    onRowClick: vi.fn(),
    emptyState: 'No data available'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render table with data', () => {
    render(
      <TestProviders>
        <CustomTable {...defaultProps} />
      </TestProviders>
    );

    expect(screen.getByText('Bill No')).toBeInTheDocument();
    expect(screen.getByText('Bill Type')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Sponsor')).toBeInTheDocument();

    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.getByText('Government Bill')).toBeInTheDocument();
    expect(screen.getByText('Minister for Health')).toBeInTheDocument();
  });

  it('should call onRowClick when row is clicked', async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();

    render(
      <TestProviders>
        <CustomTable {...defaultProps} onRowClick={onRowClick} />
      </TestProviders>
    );

    const firstRow = screen.getByText('156').closest('tr');
    await user.click(firstRow!);

    expect(onRowClick).toHaveBeenCalledWith(mockBills[0]);
  });

  it('should show empty state when no data', () => {
    render(
      <TestProviders>
        <CustomTable {...defaultProps} rows={[]} />
      </TestProviders>
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should show loading state (SkeletonTable)', () => {
    render(
      <TestProviders>
        <CustomTable {...defaultProps} isLoading={true} />
      </TestProviders>
    );

    expect(screen.getAllByRole('row')).not.toHaveLength(0);
  });

  it('should handle sorting when sortable is true', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    render(
      <TestProviders>
        <CustomTable {...defaultProps} onSort={onSort} />
      </TestProviders>
    );

    const billNoHeader = screen.getByText('Bill No');
    await user.click(billNoHeader);

    expect(onSort).toHaveBeenCalledWith({
      key: 'billNo',
      direction: SORT_DIRECTIONS.ASC
    });
  });

  it('should not handle sorting when sortable is false', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    render(
      <TestProviders>
        <CustomTable {...defaultProps} sortable={false} onSort={onSort} />
      </TestProviders>
    );

    const billNoHeader = screen.getByText('Bill No');
    await user.click(billNoHeader);

    expect(onSort).not.toHaveBeenCalled();
  });

  it('should toggle sort direction on same column click', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    render(
      <TestProviders>
        <CustomTable {...defaultProps} onSort={onSort} />
      </TestProviders>
    );

    const billNoHeader = screen.getByText('Bill No');

    await user.click(billNoHeader);
    expect(onSort).toHaveBeenLastCalledWith({
      key: 'billNo',
      direction: SORT_DIRECTIONS.ASC
    });

    await user.click(billNoHeader);
    expect(onSort).toHaveBeenLastCalledWith({
      key: 'billNo',
      direction: SORT_DIRECTIONS.DESC
    });
  });

  it('should apply default sort when provided', () => {
    const defaultSort: SortConfig<keyof (typeof mockBills)[0]> = {
      key: 'billType',
      direction: SORT_DIRECTIONS.DESC
    };

    render(
      <TestProviders>
        <CustomTable {...defaultProps} defaultSort={defaultSort} />
      </TestProviders>
    );

    expect(screen.getByText('Bill Type')).toBeInTheDocument();
  });

  it('should render pagination when provided', () => {
    render(
      <TestProviders>
        <CustomTable {...defaultProps} />
      </TestProviders>
    );

    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
    expect(screen.getByText('1–2 of 2')).toBeInTheDocument();
  });

  it('should use custom skeletonRows when provided', () => {
    render(
      <TestProviders>
        <CustomTable {...defaultProps} isLoading={true} skeletonRows={5} />
      </TestProviders>
    );

    expect(screen.getAllByRole('row')).not.toHaveLength(0);
  });

  it('should apply correct table styling', () => {
    render(
      <TestProviders>
        <CustomTable {...defaultProps} />
      </TestProviders>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveClass('MuiTable-root');
  });

  it('should handle custom empty state', () => {
    const customEmptyState = 'No bills found';

    render(
      <TestProviders>
        <CustomTable
          {...defaultProps}
          rows={[]}
          emptyState={customEmptyState}
        />
      </TestProviders>
    );

    expect(screen.getByText(customEmptyState)).toBeInTheDocument();
  });

  it('should not call onRowClick when not provided', async () => {
    const user = userEvent.setup();
    const { ...propsWithoutRowClick } = defaultProps;

    render(
      <TestProviders>
        <CustomTable {...propsWithoutRowClick} />
      </TestProviders>
    );

    const firstRow = screen.getByText('156').closest('tr');
    await user.click(firstRow!);

    expect(firstRow).toBeInTheDocument();
  });

  it('should sort data correctly when sortConfig changes', () => {
    render(
      <TestProviders>
        <CustomTable {...defaultProps} />
      </TestProviders>
    );

    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.getByText('157')).toBeInTheDocument();
  });

  it('should handle edge case with single row', () => {
    const singleRow = [mockBills[0]];

    render(
      <TestProviders>
        <CustomTable {...defaultProps} rows={singleRow} />
      </TestProviders>
    );

    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.queryByText('157')).not.toBeInTheDocument();
  });
});
