import { z } from 'zod';

export const favouritesResponseSchema = z.object({
  success: z.boolean(),
  favourites: z.record(z.string(), z.boolean()),
  message: z.string().optional()
});

export const addFavouriteRequestSchema = z.object({
  billId: z.string().min(1, 'Bill ID is required')
});

export const removeFavouriteRequestSchema = z.object({
  billId: z.string().min(1, 'Bill ID is required')
});

export const addFavouriteResponseSchema = favouritesResponseSchema.extend({
  message: z.string().default('Bill added to favourites')
});

export const removeFavouriteResponseSchema = favouritesResponseSchema.extend({
  message: z.string().default('Bill removed from favourites')
});

export const getFavouritesResponseSchema = favouritesResponseSchema;
