import { useBillsQuery } from '../../hooks/api/useBillsQuery';
import { useBillStore } from '../../store/useBillStore';
import type { BillModel } from '../../types/bill.type';
import { CustomTable } from '../ui';
import type { ColumnConfig } from '../ui/CustomTable/CustomTable.types';

export const BillTable = () => {
  const {
    pagination: { page, pageSize },
    setPage,
    setPageSize
  } = useBillStore();
  const {
    data: queryResult,
    isLoading,
    isError,
    error
  } = useBillsQuery(page, pageSize, 'Current');

  const data = queryResult?.data || [];
  const totalCount = queryResult?.totalCount || 0;

  const columns = [
    { id: 'billNo', label: 'Bill No' },
    { id: 'billType', label: 'Type' },
    { id: 'status', label: 'Status' },
    { id: 'sponsor', label: 'Sponsor' },
    { id: 'shortTitleEn', label: 'Short Title' }
  ] satisfies ColumnConfig<BillModel>[];

  const onRowClick = (bill: BillModel) => {
    console.log(bill);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  if (isLoading) return <p>Loading…</p>;

  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <CustomTable
      columns={columns}
      rows={data}
      pagination={{
        page,
        pageSize,
        totalCount,
        onPageChange,
        onPageSizeChange
      }}
      onRowClick={onRowClick}
      emptyState="No bills available"
    />
  );
};
