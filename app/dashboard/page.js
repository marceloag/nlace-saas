import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data.user);
  // if (!data?.user) {
  //   redirect("/login");
  // }

  return (
    <header className='w-full flex flex-row gap-2 p-4 border-b-[1px] border-white border-solid justify-between'>
      <figure>
        <img src='/nlace_black.svg' alt='Nlace Logo' className='w-32' />
      </figure>
      <div className='text-sm flex flex-row items-center justify-start gap-2'>
        {/* User Info */}
        <figure className='bg-gray-200 rounded-full w-6 h-6'>
          <img
            className='w-6 h-6 rounded-full'
            src={data.user.user_metadata.picture}
            alt='User Picture'
          />
        </figure>
        Hola 👋 : {data.user.user_metadata.full_name}
      </div>
      {/* <img src="{data.user.user_metadata.picture}" /> */}
      {/* <button onClick={supabase.auth.signOut()}>Logout</button> */}
    </header>
  );
}
