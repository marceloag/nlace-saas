import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import { AccountProvider } from '@/context/AccountContext';

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const { data: permissions, error: errorpermisos } = await supabase
    .from('usuarios')
    .select('permisos')
    .eq('email', data.user.email)
    .single();
  if (error) throw error;

  return (
    <section className="flex flex-row bg-gray-50">
      <AccountProvider>
        <SideMenu userData={data.user} permisos={permissions.permisos} />
        <main className="flex flex-1 flex-col ml-9 h-screen">
          <Header />
          <div className="flex flex-1 flex-col w-full justify-start h-[100%] relative">
            {children}
          </div>
        </main>
      </AccountProvider>
    </section>
  );
}
