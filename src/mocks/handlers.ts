import { HttpResponse, delay, http } from 'msw';

import { addFavouriteRequestSchema } from '@/schemas/favourites.schema';
import type { BillModel } from '@/types/bill.type';

const favouritesMap = new Map<string, BillModel>();

export const handlers = [
  http.post('/api/favourites', async ({ request }) => {
    const body = await request.json();
    const { bill } = addFavouriteRequestSchema.parse(body);

    favouritesMap.set(bill.billNo, bill);
    await delay(300);

    return HttpResponse.json({
      success: true,
      message: 'Bill added to favourites',
      favourites: Object.fromEntries(favouritesMap)
    });
  }),

  http.delete('/api/favourites/:billId', async ({ params }) => {
    const { billId } = params;
    const billIdStr = String(billId);

    favouritesMap.delete(billIdStr);
    await delay(300);

    return HttpResponse.json({
      success: true,
      message: 'Bill removed from favourites',
      favourites: Object.fromEntries(favouritesMap)
    });
  }),

  http.get('/api/favourites', async () => {
    await delay(300);

    return HttpResponse.json({
      success: true,
      favourites: Object.fromEntries(favouritesMap)
    });
  })
];
