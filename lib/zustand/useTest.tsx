import { create } from 'zustand';

type Store = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  getIds: (branchId: string, catId: string) => void;
  clearIds: () => void;
  branchId: string;
  catId: string;
};

export const useTest = create<Store>((set) => ({
  isOpen: false,
  branchId: '',
  catId: '',
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () =>
    set((state) => ({
      ...state,
      isOpen: false,
    })),
  getIds: (branchId: string, catId: string) => {
    set((state) => ({ ...state, branchId, catId }));
  },
  clearIds: () => {
    set((state) => ({ ...state, branchId: '', catId: '' }));
  },
}));
