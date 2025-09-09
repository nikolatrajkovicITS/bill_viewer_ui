import { MODAL_TYPES, useModalStore } from '@/store/useModalStore';

import { BillModal } from './';

export const ModalManager = () => {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen) return null;

  const getModalComponent = () => {
    switch (modalType) {
      case MODAL_TYPES.BILL_DETAILS:
        return <BillModal />;
      default:
        return null;
    }
  };

  return getModalComponent();
};
