
import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const testTheme = createTheme();

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false }
    }
  });

export const TestProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

export const mockBills = [
  {
    id: '156-Government Bill-HealthInsurance',
    billNo: '156',
    billType: 'Government Bill',
    shortTitleEn: 'Health Insurance Bill 2024',
    shortTitleGa: 'Bille Árachais Sláinte 2024',
    longTitleEn: 'A Bill to amend the Health Insurance Act',
    longTitleGa: 'Bille chun an tAcht Árachais Sláinte a leasú',
    status: 'Current',
    sponsor: 'Minister for Health'
  },
  {
    id: '157-Private Members Bill-DataProtection',
    billNo: '157',
    billType: "Private Member's Bill",
    shortTitleEn: 'Data Protection Bill 2024',
    shortTitleGa: 'Bille Cosanta Sonraí 2024',
    longTitleEn: 'A Bill to strengthen data protection',
    longTitleGa: 'Bille chun dlíthe cosanta sonraí a neartú',
    status: 'Current',
    sponsor: 'Deputy Smith'
  }
];

export const mockColumns = [
  { id: 'billNo', label: 'Bill No', width: 100, sortable: true },
  { id: 'billType', label: 'Bill Type', width: 150, sortable: true },
  { id: 'status', label: 'Status', width: 120, sortable: true },
  { id: 'sponsor', label: 'Sponsor', width: 200, sortable: true }
];
