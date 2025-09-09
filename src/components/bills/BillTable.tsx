import {
  CustomTable,
  ErrorMessage,
  FavouriteButton,
  StatusChip
} from '@/components/ui';
import type { ColumnConfig } from '@/components/ui/CustomTable/CustomTable.types';
import {
  BILL_COLUMN_IDS,
  BILL_COLUMN_LABELS,
  COLUMN_WIDTHS,
  TABLE_CONFIG,
  TAB_VALUES
} from '@/constants';
import { useBillsQuery, useGetFavourites } from '@/hooks/api';
import { useQueryError } from '@/hooks/useQueryError';
import { useBillStore } from '@/store/useBillStore';
import { MODAL_TYPES, useModalStore } from '@/store/useModalStore';
import type { BillModel } from '@/types/bill.type';

export const BillTable = () => {
  const {
    pagination: { page, pageSize },
    filter: { status },
    activeTab,
    setPage,
    setPageSize,
    setSelectedBill
  } = useBillStore();
  const { data: favouritesData } = useGetFavourites();
  const { openModal } = useModalStore();

  const {
    data: queryResult,
    isLoading,
    isError,
    error
  } = useBillsQuery(page, pageSize, status);

  const { hasError, errorMessage } = useQueryError({
    isError,
    error,
    onRetry: () => window.location.reload()
  });

  // Data processing
  const allBills = queryResult?.data || [];
  const favourites = favouritesData?.favourites || {};
  const favouritesIds = Object.keys(favourites).filter((id) => favourites[id]);
  const isFavTab = activeTab === TAB_VALUES.FAVOURITES;

  const data = isFavTab
    ? allBills.filter((bill) => favouritesIds.includes(bill.billNo))
    : allBills;

  const totalCount = isFavTab ? data.length : queryResult?.totalCount || 0;

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
    },
    {
      id: BILL_COLUMN_IDS.FAVOURITE,
      label: BILL_COLUMN_LABELS.FAVOURITE,
      width: COLUMN_WIDTHS.FAVOURITE,
      render: (bill: BillModel) => <FavouriteButton billId={bill.billNo} />,
      sortable: false
    }
  ];

  const onRowClick = (bill: BillModel) => {
    setSelectedBill(bill);
    openModal(MODAL_TYPES.BILL_DETAILS);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

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
      isLoading={isLoading}
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
