import { AISDKExporter } from 'langsmith/vercel';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getKnowledgeBase } from '@/lib/ai/tools/getKnowledgeBase';
import { systemPrompt, n8nPrompt } from '@/constants/prompts';

export const maxDuration = 30;

export async function POST(req) {
  const { messages, accountId, userId, promptAgente, accountNombre } =
    await req.json();
  const system = n8nPrompt(userId, accountId, promptAgente, accountNombre);
  console.log(messages);
  const result = streamText({
    model: openai('gpt-4o-mini'),
    system,
    messages,
    tools: [getKnowledgeBase],
    experimental_telemetry: AISDKExporter.getSettings(),
    onFinish(result) {
      console.log(result.usage);
    },
    onToolCall(tool, input) {
      console.log('Tool:', tool.name, 'Input:', input);
    }
  });

  return result.toDataStreamResponse();
}
