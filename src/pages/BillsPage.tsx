import { Container } from '@mui/material';

import { BillFilter, BillHeader, BillTable } from '../components/bills';

export const BillsPage = () => {
  return (
    <Container component="main" sx={{ p: { xs: 1, sm: 4 } }}>
      <BillHeader />
      <BillFilter />
      <BillTable />
    </Container>
  );
};
