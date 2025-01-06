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

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const accounts = await getAccounts();

  return (
    <section className="flex flex-row bg-gray-50">
      <SideMenu userData={data.user} />
      <main className="w-full flex flex-1 flex-col py-2 min-h-screen ">
        <Header cuentas={accounts} />
        <div className="flex flex-col my-6 mx-4 w-full justify-between h-[100%] relative">
          {children}
          <div>
            <span className="text-xs text-gray-300"> V0.0.3</span>
          </div>
        </div>
      </main>
    </section>
  );
}
