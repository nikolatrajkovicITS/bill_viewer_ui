import { useQuery } from '@tanstack/react-query';

import { httpClient } from '../../config/httpClient';
import {
  adaptBillData,
  billApiResponseSchema
} from '../../schemas/bill.schema';
import { useBillStore } from '../../store/useBillStore';
import type { BillType } from '../../types/bill.type';

export const useBillsQuery = (
  page: number,
  pageSize: number,
  type: BillType
) => {
  const {
    filter: { status }
  } = useBillStore();

  return useQuery({
    queryKey: ['bills', page, pageSize, type, status],
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
        const response = billApiResponseSchema.parse(parsedData);
        const billData = response.results?.map(adaptBillData) || [];
        const totalCount = response.head.counts.billCount;

        return {
          data: billData,
          totalCount
        };
      } catch (error) {
        console.error('Error in useBills:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false
  });
};
