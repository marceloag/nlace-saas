'use server';

export async function sendMessage(prompt) {
  console.log('Action Value Received:', prompt);
  const response = await fetch('https://n8n.marceloag.dev/webhook/chat-nlace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });
  const result = await response.json();
  console.log(result);

  return {
    message: result.output
  };

  // try {
  //   const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   // response to json
  //   console.log(response);

  //   return {
  //     message: response,
  //   };
  // } catch (error) {
  //   console.error("Error in sendMessage:", error);
  //   throw error;
  // }

  // try {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/chat`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ message: content }),
  //   });
  //   console.log("sendMessage response:", response);
  //   return response;
  // } catch (error) {
  //   console.error("Error in sendMessage:", error);
  //   throw error;
  // }
}
