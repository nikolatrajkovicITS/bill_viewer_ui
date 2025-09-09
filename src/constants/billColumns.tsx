import { FavouriteButton, StatusChip } from '@/components/ui';
import type { ColumnConfig } from '@/components/ui/CustomTable/CustomTable.types';
import type { BillModel } from '@/types/bill.type';

export const BILL_COLUMN_IDS = {
  BILL_NO: 'billNo',
  BILL_TYPE: 'billType',
  STATUS: 'status',
  SPONSOR: 'sponsor',
  SHORT_TITLE_EN: 'shortTitleEn',
  FAVOURITE: 'favourite'
} as const satisfies Record<string, keyof BillModel | 'favourite'>;

export const BILL_COLUMN_LABELS = {
  BILL_NO: 'Bill No',
  BILL_TYPE: 'Type',
  STATUS: 'Status',
  SPONSOR: 'Sponsor',
  SHORT_TITLE_EN: 'Short Title',
  FAVOURITE: 'Favourite'
} as const;

export const COLUMN_WIDTHS = {
  BILL_NO: '100px',
  TYPE: '120px',
  STATUS: '140px',
  SPONSOR: '180px',
  FAVOURITE: '80px'
} as const;

export const billColumns: ColumnConfig<BillModel>[] = [
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
    render: (bill: BillModel) => <FavouriteButton bill={bill} />,
    sortable: false
  }
];
