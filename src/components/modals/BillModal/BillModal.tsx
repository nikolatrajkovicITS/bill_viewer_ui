import { useState } from 'react';

import { BillModalTabs } from '@/components/modals';
import { Modal } from '@/components/ui';
import { useBillStore } from '@/store/useBillStore';
import { useModalStore } from '@/store/useModalStore';


export const BillModal = () => {
  const [tabValue, setTabValue] = useState(0);

  const { isOpen, closeModal } = useModalStore();
  const { selectedBill } = useBillStore();

  const bill = selectedBill;

  if (!bill) return null;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    setTabValue(0);
    closeModal();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title={`Bill ${bill.billNo} - ${bill.billType}`}
      maxWidth="md"
    >
      <BillModalTabs
        tabValue={tabValue}
        onTabChange={handleTabChange}
        bill={bill}
      />
    </Modal>
  );
};
