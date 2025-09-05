import { z } from 'zod';

import {
  billApiResponseSchema,
  billApiSchema,
  billModelSchema,
  billTypeSchema
} from '../schemas/bill.schema';

export type BillType = z.infer<typeof billTypeSchema>;
export type BillApiItem = z.infer<typeof billApiSchema>;
export type BillApiList = z.infer<typeof billApiResponseSchema>;

export type BillModel = z.infer<typeof billModelSchema>;
