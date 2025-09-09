import { useQuery } from '@tanstack/react-query';

import { adaptBillData, billApiResponseSchema } from '@/schemas/bill.schema';
import type { BillType } from '@/types/bill.type';


export const useBillsQuery = (
  page: number,
  pageSize: number,
  status: BillType
) => {
  return useQuery({
    queryKey: ['bills', page, pageSize, status],
    queryFn: async () => {
      try {
        const skip = page * pageSize;
        const params = new URLSearchParams({
          skip: skip.toString(),
          limit: pageSize.toString(),
          bill_status: status
        });

        const proxyUrl = `/api/oireachtas/v1/legislation?${params}`;
        console.log('Making request to proxy:', proxyUrl);

        const response = await fetch(proxyUrl);

        const data = await response.json();
        const apiResponse = billApiResponseSchema.parse(data);
        const billData = apiResponse.results?.map(adaptBillData) || [];
        const totalCount = apiResponse.head.counts.billCount;

        return {
          data: billData,
          totalCount
        };
      } catch (error) {
        console.error('Error in useBills:', error);
        throw error;
      }
    }
  });
};
