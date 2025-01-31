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

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const accounts = await getAccounts();

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
