import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addFavouriteResponseSchema } from '../../schemas/favourites.schema';
import type {
  AddFavouriteResponse,
  FavouriteId
} from '../../types/favourites.type';

export const useAddFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (billId: FavouriteId): Promise<AddFavouriteResponse> => {
      const response = await fetch(`/api/favourites/${billId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      return addFavouriteResponseSchema.parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    }
  });
};
