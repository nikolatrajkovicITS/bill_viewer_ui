import { Box, Tab, Tabs } from '@mui/material';

import {
  BillModalTabPanel,
  BillTabContent
} from '@/components/modals/BillModal';
import { LANGUAGES } from '@/constants';
import type { BillModel } from '@/types/bill.type';

type BillModalTabsProps = {
  tabValue: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  bill: BillModel;
};

export const BillModalTabs = ({
  tabValue,
  onTabChange,
  bill
}: BillModalTabsProps) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          aria-label="Bill language tabs"
          variant="fullWidth"
        >
          <Tab
            label="English"
            id="bill-tab-0"
            aria-controls="bill-tabpanel-0"
          />
          <Tab
            label="Gaeilge"
            id="bill-tab-1"
            aria-controls="bill-tabpanel-1"
          />
        </Tabs>
      </Box>

      <BillModalTabPanel value={tabValue} index={0}>
        <BillTabContent bill={bill} language={LANGUAGES.ENGLISH} />
      </BillModalTabPanel>

      <BillModalTabPanel value={tabValue} index={1}>
        <BillTabContent bill={bill} language={LANGUAGES.GAEILGE} />
      </BillModalTabPanel>
    </>
  );
};
