import { createClient } from '@/utils/supabase/server';
import Chat from '@/components/chat/newChat';

import AccountSwitcher from '@/components/AccountSwitch';

export async function getAccounts() {
  const supabase = await createClient();
  const { data: accounts, error } = await supabase.from('cuentas').select('*');
  if (error) throw error;
  return accounts;
}

export async function getUserPermissions(userEmail) {
  const supabase = await createClient();
  const { data: permissions, error } = await supabase
    .from('usuarios')
    .select('permisos')
    .eq('email', userEmail)
    .single();
  if (error) throw error;
  return permissions.permisos;
}

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const permisos = await getUserPermissions(data.user.email);
  const accounts = await getAccounts();
  let userAccounts;
  if (!permisos.includes('0')) {
    userAccounts = accounts.filter((account) =>
      permisos.includes(account.id.toString())
    );
  } else {
    userAccounts = accounts;
  }

  return (
    <>
      <header className="flex flex-col border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 justify-between">
        <div className="w-full flex items-center justify-between p-4">
          <h1 className="text-xl font-bold truncate">Agente</h1>
          <AccountSwitcher accounts={userAccounts} />
        </div>
      </header>
      <Chat userId={data.user.id} />
    </>
  );
}
