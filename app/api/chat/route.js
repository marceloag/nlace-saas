import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getKnowledgeBase } from '@/lib/ai/tools/getKnowledgeBase';
import { systemPrompt } from '@/lib/constants/prompts';
// SUPABASE
import { saveMessage } from '@/app/api/chat/actions';

export const maxDuration = 30;

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

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system,
    messages,
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
