import { z } from 'zod';

export const BILL_STATUSES = {
  CURRENT: 'Current',
  WITHDRAWN: 'Withdrawn',
  ENACTED: 'Enacted',
  REJECTED: 'Rejected',
  DEFEATED: 'Defeated',
  LAPSED: 'Lapsed'
} as const;

export const BILL_STATUS_LIST = Object.values(BILL_STATUSES);

export const billTypeSchema = z.enum([
  BILL_STATUSES.CURRENT,
  BILL_STATUSES.WITHDRAWN,
  BILL_STATUSES.ENACTED,
  BILL_STATUSES.REJECTED,
  BILL_STATUSES.DEFEATED,
  BILL_STATUSES.LAPSED
]);

export const billApiSchema = z.object({
  bill: z.object({
    billNo: z.string().optional(),
    billType: z.string().optional(),
    shortTitleEn: z.string().optional(),
    shortTitleGa: z.string().optional(),
    longTitleEn: z.string().optional(),
    longTitleGa: z.string().optional(),
    mostRecentStage: z
      .object({
        event: z.object({
          showAs: z.string().optional(),
          progressStage: z.number().optional()
        })
      })
      .optional(),
    sponsors: z
      .array(
        z.object({
          sponsor: z.object({
            as: z.object({
              showAs: z.string().nullable(),
              uri: z.string().nullable()
            }),
            by: z.object({
              showAs: z.string().nullable(),
              uri: z.string().nullable()
            }),
            isPrimary: z.boolean()
          })
        })
      )
      .optional()
  })
});

export const billApiResponseSchema = z.object({
  head: z.object({
    counts: z.object({
      billCount: z.number(),
      resultCount: z.number()
    })
  }),
  results: z.array(billApiSchema)
});

export const billModelSchema = z.object({
  billNo: z.string().default('—'),
  billType: z.string().default('—'),
  shortTitleEn: z.string().default('—'),
  shortTitleGa: z.string().default('—'),
  longTitleEn: z.string().default('—'),
  longTitleGa: z.string().default('—'),
  status: z.string().default('—'),
  sponsor: z.string().default('—')
});

export const adaptBillData = (apiItem: unknown) => {
  const parsed = billApiSchema.parse(apiItem);
  const bill = parsed.bill;

  const status = bill.mostRecentStage?.event?.showAs ?? '—';
  const primarySponsor =
    bill.sponsors?.find((s) => s.sponsor.isPrimary)?.sponsor.by.showAs || '—';

  return billModelSchema.parse({
    billNo: bill.billNo ?? '—',
    billType: bill.billType ?? '—',
    shortTitleEn: bill.shortTitleEn ?? '—',
    shortTitleGa: bill.shortTitleGa ?? '—',
    longTitleEn: bill.longTitleEn ?? '—',
    longTitleGa: bill.longTitleGa ?? '—',
    status,
    sponsor: primarySponsor
  });
};
