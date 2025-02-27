'use server';
import { createClient } from '@/utils/supabase/server';
const supabase = await createClient();
const N8N_URL = process.env.NEXT_PUBLIC_N8N_URL;

export async function sendMessage(
  prompt,
  pauta,
  userId,
  accountId,
  accountName,
  accountDesc,
  promptAgente,
  model
) {
  const endPoint = '/webhook/chat-nlace';
  const sendMessageURL = N8N_URL + endPoint;
  const response = await fetch(sendMessageURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      pauta,
      userId,
      accountId,
      accountName,
      accountDesc,
      promptAgente,
      model
    })
  });
  const result = await response.json();
  // console.log(result);
  saveMessageSB(result.answer, 'ai', accountId, userId, result.posts);
  return {
    message: result.answer,
    posts: result.posts || []
  };
}

sendMessage.maxDuration = 45;

export async function getMessages(userId, accountId) {
  if (accountId) {
    const session_id = `${userId}+${accountId}`;
    const { data: mensajes, error } = await supabase
      .from('mensajes_chat')
      .select('*')
      .eq('account_id', accountId)
      .eq('user_id', userId)
      .limit(6)
      .order('timestamp', { ascending: false });
    if (error) throw error;
    const formattedMessages = mensajes.map((mensaje) => {
      return {
        id: mensaje.id,
        content: mensaje.content,
        role: mensaje.role,
        timestamp: new Date(mensaje.timestamp),
        accountId: mensaje.account_id,
        posts: mensaje.posts || []
      };
    });
    return formattedMessages.reverse();
  } else {
    return [];
  }
}

export async function saveMessageSB(content, role, accountId, userId, posts) {
  const { data, error } = await supabase
    .from('mensajes_chat')
    .insert({ content, role, account_id: accountId, user_id: userId, posts });
  if (error) throw error;
  return data;
}
