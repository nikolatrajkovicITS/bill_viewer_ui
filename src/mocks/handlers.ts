import { HttpResponse, delay, http } from 'msw';

const favouritesMap = new Map<string, boolean>();

export const handlers = [
  http.post('/api/favourites/:billId', async ({ params }) => {
    const { billId } = params;
    const billIdStr = String(billId);

    favouritesMap.set(billIdStr, true);
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
