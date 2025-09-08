import { create } from 'zustand';

export const MODAL_TYPES = {
  BILL_DETAILS: 'BILL_DETAILS'
} as const;

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];

type ModalState = {
  isOpen: boolean;
  modalType: ModalType | null;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  hasOpenModal: () => boolean;
};

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  modalType: null,

  openModal: (type: ModalType) =>
    set({
      isOpen: true,
      modalType: type
    }),

  closeModal: () =>
    set({
      isOpen: false,
      modalType: null
    }),

  hasOpenModal: () => get().isOpen
}));
