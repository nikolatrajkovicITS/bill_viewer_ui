import { COLUMN_WIDTHS, COMMON_TEXT, TABLE_CONFIG } from '../../constants';
import { useBillsQuery } from '../../hooks/api/useBillsQuery';
import { useBillStore } from '../../store/useBillStore';
import type { BillModel } from '../../types/bill.type';
import { CustomTable, StatusChip } from '../ui';
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

  const columns: ColumnConfig<BillModel>[] = [
    {
      id: 'billNo',
      label: 'Bill No',
      width: COLUMN_WIDTHS.BILL_NO,
      sortable: true
    },
    {
      id: 'billType',
      label: 'Type',
      width: COLUMN_WIDTHS.TYPE,
      sortable: true
    },
    {
      id: 'status',
      label: 'Status',
      width: COLUMN_WIDTHS.STATUS,
      render: (bill: BillModel) => <StatusChip status={bill.status} />,
      sortable: true
    },
    {
      id: 'sponsor',
      label: 'Sponsor',
      width: COLUMN_WIDTHS.SPONSOR,
      sortable: true
    },
    {
      id: 'shortTitleEn',
      label: 'Short Title',
      sortable: true
    }
  ];

  const onRowClick = (bill: BillModel) => {
    console.log(bill);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  if (isLoading) return <p>{COMMON_TEXT.LOADING}</p>;

  if (isError)
    return (
      <p>
        {COMMON_TEXT.ERROR_PREFIX}
        {error?.message}
      </p>
    );

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
      emptyState={TABLE_CONFIG.EMPTY_STATE_MESSAGE}
      sortable={true}
    />
  );
};
