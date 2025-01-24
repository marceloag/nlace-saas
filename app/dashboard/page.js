import { createClient } from '@/utils/supabase/server';
import Chat from '@/components/chat/Chat';
import { useAccount } from '@/context/AccountContext';

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <Chat userId={data.user.id} />
    </>
  );
}
