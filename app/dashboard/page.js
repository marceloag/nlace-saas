'use client';

import { useEffect, useState } from 'react';
import NewChat from '@/components/chat/newChat';
import { getUserDataAndPermissions } from '@/app/actions/usuarios';
import { useUserStore } from '@/stores/userStore';
import AccountSwitcher from '@/components/AccountSwitch';

export default function PrivatePage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const userAccounts = useUserStore((state) => state.accounts);
  const setUserAccounts = useUserStore((state) => state.setAccounts);
  const setPermisos = useUserStore((state) => state.setPermisos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      console.log('No user found, fetching data');
      try {
        const userDataAndPermissions = await getUserDataAndPermissions();
        setUser(userDataAndPermissions.user);
        setUserAccounts(userDataAndPermissions.accounts);
        setPermisos(userDataAndPermissions.permisos);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    !user ? fetchData() : setLoading(false);
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <header className="flex flex-col border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 justify-between pl-4">
        <div className="w-full flex items-center justify-between p-4">
          <h1 className="text-xl font-bold truncate">Agente</h1>
          {userAccounts && <AccountSwitcher />}
        </div>
      </header>
      {user && <NewChat />}
    </>
  );
}
