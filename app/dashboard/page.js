// import { createClient } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Chat from "@/components/Chat";

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  return (
    <section className='flex flex-row'>
      <SideMenu userData={data.user} />
      <main className='w-full flex flex-1 flex-col py-2 min-h-screen bg-gray-50'>
        <Header />
        <div className='flex flex-col my-6 mx-4 w-full justify-between h-[100%]'>
          <h1 className='text-3xl font-thin'>
            👋 Bienvenido a tu agente: {data.user.user_metadata.full_name}
          </h1>
          <Chat />
          <div>
            <span className='text-xs text-gray-300'> 0.0.1</span>
          </div>
        </div>
      </main>
    </section>
  );
}
