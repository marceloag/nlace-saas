import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import Chat from '@/components/chat/Chat';

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
      <div className="bg-transparent m-0 p-0 after:via-gray-50 after:via-40% w-full after:absolute after:w-full after:z-50 after:pb-10 after:bg-gradient-to-b after:flex  after:from-gray-50 after:to-transparent">
        <h1 className="text-3xl font-thin">
          👋 Bienvenido a tu agente: {data.user.user_metadata.full_name}
        </h1>
      </div>
      <Chat userId={data.user.id} />
    </>
  );
}
