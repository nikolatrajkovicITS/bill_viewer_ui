import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SORT_DIRECTIONS } from '@/constants';
import type { SortConfig } from '@/types/sort.types';

import { CustomTableHeader } from '../CustomTableHeader';

describe('CustomTableHeader', () => {
  const mockColumns = [
    { id: 'name', label: 'Name', width: 200, sortable: true },
    { id: 'age', label: 'Age', width: 100, sortable: true },
    { id: 'email', label: 'Email', width: 250, sortable: false }
  ];

  const defaultProps = {
    columns: mockColumns,
    sortable: true,
    sortConfig: null,
    onSort: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all column headers', () => {
    render(<CustomTableHeader {...defaultProps} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('should apply correct width styles to columns', () => {
    render(<CustomTableHeader {...defaultProps} />);

    const nameHeader = screen.getByText('Name').closest('th');
    const ageHeader = screen.getByText('Age').closest('th');
    const emailHeader = screen.getByText('Email').closest('th');

    expect(nameHeader).toHaveStyle('width: 200px');
    expect(ageHeader).toHaveStyle('width: 100px');
    expect(emailHeader).toHaveStyle('width: 250px');
  });

  it('should show sort arrows for sortable columns when sortable is true', () => {
    render(<CustomTableHeader {...defaultProps} />);

    const nameArrows = screen
      .getByText('Name')
      .parentElement?.querySelectorAll(
        '[data-testid="ArrowUpwardIcon"], [data-testid="ArrowDownwardIcon"]'
      );
    const ageArrows = screen
      .getByText('Age')
      .parentElement?.querySelectorAll(
        '[data-testid="ArrowUpwardIcon"], [data-testid="ArrowDownwardIcon"]'
      );
    const emailArrows = screen
      .getByText('Email')
      .parentElement?.querySelectorAll(
        '[data-testid="ArrowUpwardIcon"], [data-testid="ArrowDownwardIcon"]'
      );

    expect(nameArrows).toHaveLength(2);
    expect(ageArrows).toHaveLength(2);
    expect(emailArrows).toHaveLength(0);
  });

  it('should not show sort arrows when sortable is false', () => {
    render(<CustomTableHeader {...defaultProps} sortable={false} />);

    const allArrows = screen.queryAllByTestId(
      /ArrowUpwardIcon|ArrowDownwardIcon/
    );
    expect(allArrows).toHaveLength(0);
  });

  it('should call onSort when sortable column is clicked', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    render(<CustomTableHeader {...defaultProps} onSort={onSort} />);

    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);

    expect(onSort).toHaveBeenCalledWith('name');
  });

  it('should not call onSort when non-sortable column is clicked', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    render(<CustomTableHeader {...defaultProps} onSort={onSort} />);

    const emailHeader = screen.getByText('Email');
    await user.click(emailHeader);

    expect(onSort).not.toHaveBeenCalled();
  });

  it('should not call onSort when sortable is false', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    const nonSortableColumns = [
      { id: 'name', label: 'Name', width: 200, sortable: false },
      { id: 'age', label: 'Age', width: 100, sortable: false },
      { id: 'email', label: 'Email', width: 250, sortable: false }
    ];

    render(
      <CustomTableHeader
        {...defaultProps}
        columns={nonSortableColumns}
        sortable={false}
        onSort={onSort}
      />
    );

    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);

    expect(onSort).not.toHaveBeenCalled();
  });

  it('should highlight active sort column with correct arrow opacity', () => {
    const sortConfig: SortConfig<'name' | 'age' | 'email'> = {
      key: 'name',
      direction: SORT_DIRECTIONS.ASC
    };

    render(<CustomTableHeader {...defaultProps} sortConfig={sortConfig} />);

    const nameArrows = screen
      .getByText('Name')
      .parentElement?.querySelectorAll('svg');
    expect(nameArrows).toHaveLength(2);

    const upArrow = nameArrows?.[0];
    const downArrow = nameArrows?.[1];

    expect(upArrow).toHaveStyle('opacity: 1');
    expect(downArrow).toHaveStyle('opacity: 0.3');
  });

  it('should highlight DESC sort direction correctly', () => {
    const sortConfig: SortConfig<'name' | 'age' | 'email'> = {
      key: 'age',
      direction: SORT_DIRECTIONS.DESC
    };

    render(<CustomTableHeader {...defaultProps} sortConfig={sortConfig} />);

    const ageArrows = screen
      .getByText('Age')
      .parentElement?.querySelectorAll('svg');
    expect(ageArrows).toHaveLength(2);

    const upArrow = ageArrows?.[0];
    const downArrow = ageArrows?.[1];

    expect(upArrow).toHaveStyle('opacity: 0.3');
    expect(downArrow).toHaveStyle('opacity: 1');
  });

  it('should apply correct cursor styles', () => {
    render(<CustomTableHeader {...defaultProps} />);

    const nameHeader = screen.getByText('Name').closest('th');
    const ageHeader = screen.getByText('Age').closest('th');
    const emailHeader = screen.getByText('Email').closest('th');

    expect(nameHeader).toHaveStyle('cursor: pointer');
    expect(ageHeader).toHaveStyle('cursor: pointer');
    expect(emailHeader).toHaveStyle('cursor: default');
  });

  it('should apply user-select: none to prevent text selection', () => {
    render(<CustomTableHeader {...defaultProps} />);

    const headers = screen.getAllByRole('columnheader');
    headers.forEach((header) => {
      expect(header).toHaveStyle('user-select: none');
    });
  });
});
