import type { BillModel } from '../types/bill.type';

export const BILL_COLUMN_IDS = {
  BILL_NO: 'billNo',
  BILL_TYPE: 'billType',
  STATUS: 'status',
  SPONSOR: 'sponsor',
  SHORT_TITLE_EN: 'shortTitleEn'
} as const satisfies Record<string, keyof BillModel>;

export const BILL_COLUMN_LABELS = {
  BILL_NO: 'Bill No',
  BILL_TYPE: 'Type',
  STATUS: 'Status',
  SPONSOR: 'Sponsor',
  SHORT_TITLE_EN: 'Short Title'
} as const;
