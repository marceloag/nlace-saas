'use client';
import { create } from 'zustand';

const useAccountStore = create((set) => ({
  selectedAccount: null,
  currentAccount: null,
  allAccounts: null,
  setSelectedAccount: (selectedAccount) => set({ selectedAccount }),
  setCurrentAccount: (currentAccount) => set({ currentAccount }),
  setAllAccounts: (allAccounts) => set({ allAccounts }),
}));

export default useAccountStore;
