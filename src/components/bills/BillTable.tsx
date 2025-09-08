import {
  BILL_COLUMN_IDS,
  BILL_COLUMN_LABELS,
  COLUMN_WIDTHS,
  COMMON_TEXT,
  TABLE_CONFIG
} from '../../constants';
import { useBillsQuery } from '../../hooks/api/useBillsQuery';
import { useQueryError } from '../../hooks/useQueryError';
import { useBillStore } from '../../store/useBillStore';
import type { BillModel } from '../../types/bill.type';
import { CustomTable, ErrorMessage, StatusChip } from '../ui';
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

  const { hasError, errorMessage } = useQueryError({
    isError,
    error,
    onRetry: () => window.location.reload()
  });

  const data = queryResult?.data || [];
  const totalCount = queryResult?.totalCount || 0;

  const columns: ColumnConfig<BillModel>[] = [
    {
      id: BILL_COLUMN_IDS.BILL_NO,
      label: BILL_COLUMN_LABELS.BILL_NO,
      width: COLUMN_WIDTHS.BILL_NO,
      sortable: true
    },
    {
      id: BILL_COLUMN_IDS.BILL_TYPE,
      label: BILL_COLUMN_LABELS.BILL_TYPE,
      width: COLUMN_WIDTHS.TYPE,
      sortable: true
    },
    {
      id: BILL_COLUMN_IDS.STATUS,
      label: BILL_COLUMN_LABELS.STATUS,
      width: COLUMN_WIDTHS.STATUS,
      render: (bill: BillModel) => <StatusChip status={bill.status} />,
      sortable: true
    },
    {
      id: BILL_COLUMN_IDS.SPONSOR,
      label: BILL_COLUMN_LABELS.SPONSOR,
      width: COLUMN_WIDTHS.SPONSOR,
      sortable: true
    },
    {
      id: BILL_COLUMN_IDS.SHORT_TITLE_EN,
      label: BILL_COLUMN_LABELS.SHORT_TITLE_EN,
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

  if (hasError)
    return (
      <ErrorMessage
        message={errorMessage}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <CustomTable
      columns={columns}
      rows={data}
      sortable
      pagination={{
        page,
        pageSize,
        totalCount,
        onPageChange,
        onPageSizeChange
      }}
      onRowClick={onRowClick}
      emptyState={TABLE_CONFIG.EMPTY_STATE_MESSAGE}
    />
  );
};
