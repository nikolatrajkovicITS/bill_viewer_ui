import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TestProviders } from '@/test/utils/testProviders';

import { CustomTableFooter } from '../CustomTableFooter';

describe('CustomTableFooter', () => {
  const mockPagination = {
    page: 0,
    pageSize: 10,
    totalCount: 25,
    onPageChange: vi.fn(),
    onPageSizeChange: vi.fn(),
    rowsPerPageOptions: [5, 10, 25, 50]
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render pagination when pagination prop is provided', () => {
    render(
      <TestProviders>
        <CustomTableFooter pagination={mockPagination} />
      </TestProviders>
    );

    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
    expect(screen.getByText('1–10 of 25')).toBeInTheDocument();
  });

  it('should not render anything when pagination is not provided', () => {
    const { container } = render(
      <TestProviders>
        <CustomTableFooter pagination={undefined} />
      </TestProviders>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should call onPageChange when page is changed', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <TestProviders>
        <CustomTableFooter pagination={{ ...mockPagination, onPageChange }} />
      </TestProviders>
    );

    const nextButton = screen.getByLabelText('Go to next page');
    await user.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should display correct page information', () => {
    const pagination = {
      ...mockPagination,
      page: 2,
      pageSize: 5,
      totalCount: 23
    };

    render(
      <TestProviders>
        <CustomTableFooter pagination={pagination} />
      </TestProviders>
    );

    expect(screen.getByText('11–15 of 23')).toBeInTheDocument();
  });

  it('should show first and last page buttons', () => {
    render(
      <TestProviders>
        <CustomTableFooter pagination={mockPagination} />
      </TestProviders>
    );

    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('should use custom rowsPerPageOptions when provided', () => {
    const customOptions = [10, 20, 50];
    const pagination = {
      ...mockPagination,
      rowsPerPageOptions: customOptions
    };

    render(
      <TestProviders>
        <CustomTableFooter pagination={pagination} />
      </TestProviders>
    );

    const rowsPerPageSelect = screen.getByDisplayValue('10');
    expect(rowsPerPageSelect).toBeInTheDocument();

    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });

  it('should use default rowsPerPageOptions when not provided', () => {
    const paginationWithoutOptions = {
      page: 0,
      pageSize: 10,
      totalCount: 25,
      onPageChange: vi.fn(),
      onPageSizeChange: vi.fn()
    };

    render(
      <TestProviders>
        <CustomTableFooter pagination={paginationWithoutOptions} />
      </TestProviders>
    );

    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });

  it('should handle edge case with single page', () => {
    const singlePagePagination = {
      ...mockPagination,
      totalCount: 5,
      pageSize: 10
    };

    render(
      <TestProviders>
        <CustomTableFooter pagination={singlePagePagination} />
      </TestProviders>
    );

    expect(screen.getByText('1–5 of 5')).toBeInTheDocument();
  });

  it('should handle edge case with empty data', () => {
    const emptyPagination = {
      ...mockPagination,
      totalCount: 0
    };

    render(
      <TestProviders>
        <CustomTableFooter pagination={emptyPagination} />
      </TestProviders>
    );

    expect(screen.getByText('0–0 of 0')).toBeInTheDocument();
  });

  it('should disable first/previous buttons on first page', () => {
    render(
      <TestProviders>
        <CustomTableFooter pagination={mockPagination} />
      </TestProviders>
    );

    const firstButton = screen.getByLabelText('Go to first page');
    const prevButton = screen.getByLabelText('Go to previous page');

    expect(firstButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });

  it('should disable last/next buttons on last page', () => {
    const lastPagePagination = {
      ...mockPagination,
      page: 2,
      totalCount: 25,
      pageSize: 10
    };

    render(
      <TestProviders>
        <CustomTableFooter pagination={lastPagePagination} />
      </TestProviders>
    );

    const nextButton = screen.getByLabelText('Go to next page');
    const lastButton = screen.getByLabelText('Go to last page');

    expect(nextButton).toBeDisabled();
    expect(lastButton).toBeDisabled();
  });
});
