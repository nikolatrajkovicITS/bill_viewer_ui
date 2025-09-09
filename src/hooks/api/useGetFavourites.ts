import { useQuery } from '@tanstack/react-query';

import { getFavouritesResponseSchema } from '@/schemas/favourites.schema';
import type { GetFavouritesResponse } from '@/types/favourites.type';


export const useGetFavourites = () => {
  return useQuery({
    queryKey: ['favourites'],
    queryFn: async (): Promise<GetFavouritesResponse> => {
      const response = await fetch('/api/favourites');

      const data = await response.json();

      return getFavouritesResponseSchema.parse(data);
    }
  });
};
