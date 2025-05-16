import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';

const handler = createMcpHandler((server) => {
  server.tool(
    'echo',
    'this tool echo the message sent to it',
    { message: z.string() },
    async ({ message }) => ({
      content: [{ type: 'text', text: `Tool echo: ${message}` }]
    })
  );
});

export { handler as GET, handler as POST, handler as DELETE };
