import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';
import { queryClient } from './config/queryClient';
import './index.css';
import { appTheme } from './styles/theme';

// Start MSW in development mode
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass'
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
