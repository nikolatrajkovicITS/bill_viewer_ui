import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_HEADERS } from '@/config/apiHeaders';
import { addFavouriteResponseSchema } from '@/schemas/favourites.schema';
import type { BillModel } from '@/types/bill.type';
import type { AddFavouriteResponse } from '@/types/favourites.type';


export const useAddFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bill: BillModel): Promise<AddFavouriteResponse> => {
      const response = await fetch('/api/favourites', {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ bill })
      });

      const data = await response.json();

      return addFavouriteResponseSchema.parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    }
  });
};
