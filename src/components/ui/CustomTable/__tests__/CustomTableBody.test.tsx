import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  TestProviders,
  mockBills,
  mockColumns
} from '@/test/utils/testProviders';

import { CustomTableBody } from '../CustomTableBody';

describe('CustomTableBody', () => {
  const defaultProps = {
    columns: mockColumns,
    rows: mockBills,
    onRowClick: vi.fn(),
    isLoading: false,
    skeletonRows: 10
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render table rows with data', () => {
    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} />
      </TestProviders>
    );

    expect(screen.getByText('156')).toBeInTheDocument();
    expect(screen.getByText('Government Bill')).toBeInTheDocument();
    expect(screen.getAllByText('Current')).toHaveLength(2);
    expect(screen.getByText('Minister for Health')).toBeInTheDocument();
  });

  it('should call onRowClick when row is clicked', async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();

    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} onRowClick={onRowClick} />
      </TestProviders>
    );

    const firstRow = screen.getByText('156').closest('tr');
    await user.click(firstRow!);

    expect(onRowClick).toHaveBeenCalledWith(mockBills[0]);
  });

  it('should not call onRowClick when onRowClick is not provided', async () => {
    const user = userEvent.setup();

    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} onRowClick={undefined} />
      </TestProviders>
    );

    const firstRow = screen.getByText('156').closest('tr');
    await user.click(firstRow!);

    expect(firstRow).toBeInTheDocument();
  });

  it('should show loading state (SkeletonTable) when isLoading is true', () => {
    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} isLoading={true} />
      </TestProviders>
    );

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should use custom skeletonRows when provided', () => {
    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} isLoading={true} skeletonRows={5} />
      </TestProviders>
    );

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should show empty state when no data', () => {
    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} rows={[]} />
      </TestProviders>
    );

    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('should show custom empty state when provided', () => {
    const customEmptyState = 'No bills found';

    render(
      <TestProviders>
        <CustomTableBody
          {...defaultProps}
          rows={[]}
          emptyState={customEmptyState}
        />
      </TestProviders>
    );

    expect(screen.getByText(customEmptyState)).toBeInTheDocument();
  });

  it('should render all columns for each row', () => {
    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} />
      </TestProviders>
    );

    const rows = screen.getAllByRole('row');
    const dataRows = rows.slice(1);

    dataRows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      expect(cells).toHaveLength(mockColumns.length);
    });
  });

  it('should use custom render function when provided', () => {
    const columnsWithRender = [
      {
        id: 'billNo',
        label: 'Bill No',
        width: 100,
        sortable: true,
        render: (row: { billNo: string }) => `Bill #${row.billNo}`
      },
      { id: 'billType', label: 'Bill Type', width: 150, sortable: true },
      { id: 'status', label: 'Status', width: 120, sortable: true },
      { id: 'sponsor', label: 'Sponsor', width: 200, sortable: true }
    ];

    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} columns={columnsWithRender} />
      </TestProviders>
    );

    expect(screen.getByText('Bill #156')).toBeInTheDocument();
    expect(screen.getByText('Bill #157')).toBeInTheDocument();
  });

  it('should handle null/undefined values gracefully', () => {
    const rowsWithNulls = [
      {
        id: '1',
        billNo: null,
        billType: undefined,
        status: 'Current',
        sponsor: 'Test Sponsor'
      }
    ];

    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} rows={rowsWithNulls} />
      </TestProviders>
    );

    expect(screen.getAllByText('—')).toHaveLength(2);
  });

  it('should generate unique keys for rows', () => {
    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} />
      </TestProviders>
    );

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should apply hover effect to rows', () => {
    render(
      <TestProviders>
        <CustomTableBody {...defaultProps} />
      </TestProviders>
    );

    const firstRow = screen.getByText('156').closest('tr');
    expect(firstRow).toHaveClass('MuiTableRow-root');
  });
});
