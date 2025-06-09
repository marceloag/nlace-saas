import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { getKnowledgeBase } from '@/lib/ai/tools/getKnowledgeBase'
import { getWeather } from '@/lib/ai/tools/getWeather'
import { generatePosts } from '@/lib/ai/tools/generatePosts'
import { generateChart } from '@/lib/ai/tools/generateChart'
import { systemPrompt } from '@/lib/constants/prompts'
// MCP
import { experimental_createMCPClient as createMCPClient } from 'ai'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp'

export const maxDuration = 45

export async function POST(req) {
  const {
    messages,
    accountId,
    userId,
    promptAgente,
    accountNombre,
    conversationId
  } = await req.json()

  // MCP FIRECRAWL
  const firecrawlMCP = await createMCPClient({
    transport: {
      type: 'sse',
      url: `https://mcp.firecrawl.dev/${process.env.FIRECRAWL_MCP_KEY}/sse`
    }
  })

  const firecrawlTools = await firecrawlMCP.tools()

  const mcpUrl = `${process.env.NEXT_PUBLIC_URL}/api/mcp`

  const customClient = await createMCPClient({
    transport: new StreamableHTTPClientTransport(mcpUrl, {
      sessionId: 'session_123'
    })
  })

  const mcpToolsDice = await customClient.tools()

  // MCP TRELLO
  const mcpTrelloUrl = `${process.env.NEXT_PUBLIC_URL}/api/mcp-trello/mcp`
  const customClientTrello = await createMCPClient({
    transport: new StreamableHTTPClientTransport(mcpTrelloUrl)
  })
  const mcpToolsTrello = await customClientTrello.tools()
  // END MCP

  const messagesHavePDF = messages.some((message) =>
    message.experimental_attachments?.some(
      (a) => a.contentType === 'application/pdf'
    )
  )

  const userMessage = messages
    .filter((msg) => msg.role === 'user')
    .pop()?.content
  const system = systemPrompt(userId, accountId, promptAgente, accountNombre)
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
      ...mcpToolsDice,
      ...mcpToolsTrello,
      ...firecrawlTools
    },
    toolCallStreaming: true,
    maxSteps: 5,
    experimental_telemetry: { isEnabled: true },
    onFinish: async ({ response }) => {
      console.log(response.usage)
      console.log(JSON.stringify(response, null, 2))
      // MCP
      await customClient.close()
      await customClientTrello.close()
    },
    onToolCall(tool, input) {
      console.log('Tool:', tool.name, 'Input:', input)
    }
  })

  return result.toDataStreamResponse()
}
