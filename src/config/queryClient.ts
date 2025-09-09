import { QueryClient } from '@tanstack/react-query';

const ONE_MINUTE = 1 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE,
      refetchOnWindowFocus: false
    }
  }
});
