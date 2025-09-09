import { Container } from '@mui/material';

import {
  BillFilter,
  BillHeader,
  BillTable,
  BillTabs
} from '@/components/bills';

export const BillsPage = () => {
  return (
    <Container component="main" sx={{ p: { xs: 1, sm: 4 } }}>
      <BillHeader />
      <BillTabs />
      <BillFilter />
      <BillTable />
    </Container>
  );
};
