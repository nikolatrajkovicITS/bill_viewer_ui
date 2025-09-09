import { CustomTable, ErrorMessage } from '@/components/ui';
import { TABLE_CONFIG, TAB_VALUES, billColumns } from '@/constants';
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
  const isFavTab = activeTab === TAB_VALUES.FAVOURITES;

  const data = isFavTab ? Object.values(favourites) : allBills;

  const totalCount = isFavTab ? data.length : queryResult?.totalCount || 0;

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
      columns={billColumns}
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
