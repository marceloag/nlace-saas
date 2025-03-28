import { createClient } from '@/utils/supabase/server';

export async function getOrCreateConversation(userId, accountId) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('conversations')
    .select('id')
    .eq('user_id', userId)
    .eq('accountId', accountId)
    .single();

  if (error) {
    const { data: newConversation, error: createError } = await supabase
      .from('conversations')
      .insert([{ user_id: userId, accountId: accountId }])
      .select()
      .single();

    if (createError) {
      console.error('Error creating conversation:', createError);
      return null;
    }

    return newConversation.id;
  }

  return data.id;
}

export async function getConversationMessages(conversationId) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('messages')
    .select('id, sender, content, created_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return;
  }

  return data.map((msg) => ({
    id: msg.id,
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.content
  }));
}

export async function saveMessage(
  conversationId,
  sender,
  content,
  usage,
  finishReason
) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('messages').insert([
    {
      conversation_id: conversationId,
      sender,
      content,
      usage,
      finish_reason: finishReason
    }
  ]);

  if (error) console.error('Error saving message:', error);
  return data;
}
