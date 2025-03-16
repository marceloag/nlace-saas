import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { supabase } from '@/lib/supabaseClient';

export const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null })
    }),
    {
      name: 'user-storage',
      getStorage: () => sessionStorage
    }
  )
);
