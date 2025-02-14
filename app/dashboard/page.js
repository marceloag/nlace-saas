import { createClient } from '@/utils/supabase/server';
import Chat from '@/components/chat/Chat';
import { useAccount } from '@/context/AccountContext';
import AccountSwitcher from '@/components/AccountSwitch';

export async function getAccounts() {
  const supabase = await createClient();
  const { data: accounts, error } = await supabase.from('cuentas').select('*');
  if (error) throw error;
  return accounts;
}

export async function getUserPersmisions(userEmail) {
  const supabase = await createClient();
  const { data: permissions, error } = await supabase
    .from('usuarios')
    .select('permisos')
    .eq('email', userEmail)
    .single();
  if (error) throw error;
  console.log(permissions);
  return permissions;
}

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const permisos = await getUserPersmisions(data.user.email);
  const accounts = await getAccounts();
  // check which accounts the user has access to
  // const userAccounts = accounts.filter((account) =>
  //   permisos.includes(account.id)
  // );
  // console.log(userAccounts);

  return (
    <>
      <AccountSwitcher
        accounts={accounts}
        className="absolute right-4 z-[99]"
      />
      <Chat userId={data.user.id} />
    </>
  );
}
