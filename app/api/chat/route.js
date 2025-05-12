import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getKnowledgeBase } from '@/lib/ai/tools/getKnowledgeBase';
import { getWeather } from '@/lib/ai/tools/getWeather';
import { generatePosts } from '@/lib/ai/tools/generatePosts';
import { generateChart } from '@/lib/ai/tools/generateChart';
import { systemPrompt } from '@/lib/constants/prompts';
// SUPABASE

export const maxDuration = 45;

export async function POST(req) {
  const {
    messages,
    accountId,
    userId,
    promptAgente,
    accountNombre,
    conversationId
  } = await req.json();

  const userMessage = messages
    .filter((msg) => msg.role === 'user')
    .pop()?.content;
  const system = systemPrompt(userId, accountId, promptAgente, accountNombre);
  // const system = `You are a friendly assistant! Keep your responses concise and helpful.`;

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system,
    messages,
    tools: { getKnowledgeBase, getWeather, generatePosts, generateChart },
    toolCallStreaming: true,
    maxSteps: 5,
    experimental_telemetry: { isEnabled: true },
    onFinish: async ({ response }) => {
      console.log(response.usage);
      console.log(JSON.stringify(response, null, 2));
    },
    onToolCall(tool, input) {
      console.log('Tool:', tool.name, 'Input:', input);
    }
  });

  return result.toDataStreamResponse();
}
