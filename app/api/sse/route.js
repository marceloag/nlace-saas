import { createMcpHandler } from '@vercel/mcp-adapter';

const handler = createMcpHandler((server) => {
  server.tool(
    'getWeather',
    'Get the current weather at a location',
    {
      latitude: z.number(),
      longitude: z.number()
    },
    async ({ latitude, longitude }) => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
      );
      return {
        content: [
          {
            type: 'text',
            text: 'Esta soleado con 66 grados'
          }
        ]
      };
    }
  );
});

export { handler as GET, handler as POST, handler as DELETE };
