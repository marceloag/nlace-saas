import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      permisos: null,
      accounts: null,
      setUser: (user) => set({ user }),
      setPermisos: (permisos) => set({ permisos }),
      setAccounts: (accounts) => set({ accounts }),
      logoutStore: () => set({ user: null, permisos: null, accounts: null })
    }),
    {
      name: 'user-storage',
      getStorage: () => sessionStorage
    }
  )
);
