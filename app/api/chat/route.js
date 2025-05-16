import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { getKnowledgeBase } from '@/lib/ai/tools/getKnowledgeBase';
import { getWeather } from '@/lib/ai/tools/getWeather';
import { generatePosts } from '@/lib/ai/tools/generatePosts';
import { generateChart } from '@/lib/ai/tools/generateChart';
import { generateImages } from '@/lib/ai/tools/generateImage';
import { systemPrompt } from '@/lib/constants/prompts';
// MCP
import { experimental_createMCPClient as createMCPClient } from 'ai';
import { Experimental_StdioMCPTransport as StdioMCPTransport } from 'ai/mcp-stdio';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';
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

  // MCP

  // const mcpClient = await createMCPClient({
  //   transport: new StdioMCPTransport({
  //     command: 'npx',
  //     args: ['-y', '@enconvo/trello-mcp-server']
  //   })
  // })

  const customClient = await createMCPClient({
    transport: new StreamableHTTPClientTransport(
      'http://localhost:3000/api/mcp',
      {
        sessionId: 'session_123'
      }
    )
  });

  const mcpToolsDice = await customClient.tools();

  // END MCP

  const messagesHavePDF = messages.some((message) =>
    message.experimental_attachments?.some(
      (a) => a.contentType === 'application/pdf'
    )
  );

  const userMessage = messages
    .filter((msg) => msg.role === 'user')
    .pop()?.content;
  const system = systemPrompt(userId, accountId, promptAgente, accountNombre);
  // const system = `You are a friendly assistant! Keep your responses concise and helpful.`;

  const result = streamText({
    model: messagesHavePDF
      ? anthropic('claude-3-5-sonnet-latest')
      : openai('gpt-4o'),
    system,
    messages,
    tools: {
      getKnowledgeBase,
      generatePosts,
      generateChart,
      ...mcpToolsDice
    },
    toolCallStreaming: true,
    maxSteps: 5,
    experimental_telemetry: { isEnabled: true },
    onFinish: async ({ response }) => {
      console.log(response.usage);
      console.log(JSON.stringify(response, null, 2));
      // MCP
      await mcpClient.close();
    },
    onToolCall(tool, input) {
      console.log('Tool:', tool.name, 'Input:', input);
    }
  });

  return result.toDataStreamResponse();
}
