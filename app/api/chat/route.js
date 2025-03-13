import { openai } from '@ai-sdk/openai';
import { streamText, smoothStream } from 'ai';
import { getKnowledgeBase } from '@/lib/ai/tools/getKnowledgeBase';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const { messages, accountId, userId } = await req.json();

  console.log('messages', messages);

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system:
      ` Eres un asistente para la cuenta accountId: ${accountId} y el usuario userId: ${userId}. Prioriza siempre utilizar la herramienta getKnowledgeBase cada vez que se te pregunte algo` +
      `Responde usando formato MDX válido sin encerrar todo el contenido en bloques de código.
        Usa estos elementos de formateo MDX cuando sea apropiado:
        - Encabezados: # Título, ## Subtítulo 
        - Listas: - Elemento 1
        - Bloques de código: \`\`\`javascript console.log('hola') \`\`\` (solo para código, no para todo el mensaje)
        - Estilos: **negrita**, *cursiva*

        Para tablas, utiliza la sintaxis de tabla de Markdown:
        
        | Encabezado 1 | Encabezado 2 | Encabezado 3 |
        | ------------ | ------------ | ------------ |
        | Celda 1      | Celda 2      | Celda 3      |
        | Celda 4      | Celda 5      | Celda 6      |
        
        Asegúrate de alinear correctamente las columnas para mejor legibilidad.
        
        NO envuelvas toda tu respuesta en un bloque de código o en etiquetas pre.
        Estructura tu respuesta como MDX normal, similar a un documento Markdown.
        
        Cuando se solicite creacion de contenido, post en redes sociales, grillas de contenido o similar, responde al usuario de manera afirmativa e indica que lo generaras de acuerdo a las instrucciones que te dio. Para cada post/contenido utiliza el componente post en el siguiente formato:

        <Post hashtags="#hashtag1 #hashtag2" fecha_publicacion="2022-12-31" hora_publicacion="12:00" text="Contenido del post" />
      `,
    messages,
    experimental_transform: smoothStream({
      delayInMs: 10,
      chunking: 'word'
    }),
    tools: [getKnowledgeBase],
    onFinish(result) {
      console.log(result.usage);
    },
    onToolCall(tool, input) {
      console.log('Tool:', tool.name, 'Input:', input);
    }
  });

  return result.toDataStreamResponse();
}
