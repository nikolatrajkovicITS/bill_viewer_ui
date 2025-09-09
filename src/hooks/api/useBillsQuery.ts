import { useQuery } from '@tanstack/react-query';

import { httpClient } from '../../config/httpClient';
import {
  adaptBillData,
  billApiResponseSchema
} from '../../schemas/bill.schema';
import type { BillType } from '../../types/bill.type';

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

        const apiUrl = `https://api.oireachtas.ie/v1/legislation?${params}`;
        console.log('Making request to:', apiUrl);

        const { data } = await httpClient.get('', {
          params: { url: apiUrl }
        });

        const parsedData = JSON.parse(data.contents);
        const apiResponse = billApiResponseSchema.parse(parsedData);
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
