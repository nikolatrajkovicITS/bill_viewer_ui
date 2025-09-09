import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeFavouriteResponseSchema } from '../../schemas/favourites.schema';
import type {
  FavouriteId,
  RemoveFavouriteResponse
} from '../../types/favourites.type';

export const useRemoveFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      billId: FavouriteId
    ): Promise<RemoveFavouriteResponse> => {
      const response = await fetch(`/api/favourites/${billId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      return removeFavouriteResponseSchema.parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    }
  });
};
