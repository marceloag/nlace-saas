'use server';

export async function sendMessage(prompt, pauta, userId) {
  const response = await fetch('https://n8n.marceloag.dev/webhook/chat-nlace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt, pauta, userId })
  });
  const result = await response.json();
  console.log(result);
  return {
    message: result.answer
  };
}

export async function generarPauta() {
  const response = await fetch(
    'https://n8n.marceloag.dev/webhook/crear-pauta',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }
  );
  const result = await response.json();

  return {
    message: result
  };
}
