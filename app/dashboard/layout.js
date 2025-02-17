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
        <main className="flex flex-1 flex-col py-2 min-h-[calc(100vh-1.2em)] ml-14">
          <Header />
          <div className="flex flex-col my-6 mx-4 w-full justify-between h-[100%] relative">
            {children}
            <div>
              <span className="text-xs text-gray-300"> V0.0.6</span>
            </div>
          </div>
        </main>
      </AccountProvider>
    </section>
  );
}
