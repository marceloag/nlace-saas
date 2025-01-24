import { createClient } from '@/utils/supabase/server';
import Chat from '@/components/chat/Chat';

export default async function PrivatePage({ params }) {
  const { id } = params;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <Chat userId={data.user.id} accountId={id} />
    </>
  );
}
