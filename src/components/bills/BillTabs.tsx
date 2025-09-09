import { Box, Tab, Tabs } from '@mui/material';

import { TAB_VALUES, type TabValue } from '@/constants';
import { useBillStore } from '@/store/useBillStore';

export const BillTabs = () => {
  const { activeTab, setActiveTab } = useBillStore();

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: TabValue
  ) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="All Bills" value={TAB_VALUES.ALL} />
        <Tab label="Favourites" value={TAB_VALUES.FAVOURITES} />
      </Tabs>
    </Box>
  );
};
