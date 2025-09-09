import { z } from 'zod';

import {
  addFavouriteRequestSchema,
  addFavouriteResponseSchema,
  favouritesResponseSchema,
  getFavouritesResponseSchema,
  removeFavouriteRequestSchema,
  removeFavouriteResponseSchema
} from '@/schemas/favourites.schema';
import type { BillModel } from '@/types/bill.type';

export type FavouritesResponse = z.infer<typeof favouritesResponseSchema>;

export type AddFavouriteRequest = z.infer<typeof addFavouriteRequestSchema>;
export type AddFavouriteResponse = z.infer<typeof addFavouriteResponseSchema>;

export type RemoveFavouriteRequest = z.infer<
  typeof removeFavouriteRequestSchema
>;
export type RemoveFavouriteResponse = z.infer<
  typeof removeFavouriteResponseSchema
>;

export type GetFavouritesResponse = z.infer<typeof getFavouritesResponseSchema>;

export type FavouritesMap = Record<string, BillModel>;
export type FavouriteId = string;
