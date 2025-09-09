import type { SelectChangeEvent } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { BILL_STATUS_LIST } from '@/schemas/bill.schema';
import { useBillStore } from '@/store/useBillStore';
import type { BillType } from '@/types/bill.type';

export const BillFilter = () => {
  const { filter, setStatusFilter } = useBillStore();

  const handleStatusChange = (event: SelectChangeEvent<BillType>) => {
    const value = event.target.value;
    setStatusFilter(value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 150, mb: 2 }}>
      <InputLabel id="status-filter-label">Status</InputLabel>
      <Select
        labelId="status-filter-label"
        id="status-filter"
        value={filter.status}
        label="Status"
        onChange={handleStatusChange}
      >
        {BILL_STATUS_LIST.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
