// app/api/[transport]/route.ts
import { createMcpHandler } from '@vercel/mcp-adapter'
import { z } from 'zod'
// auth
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const handler = createMcpHandler(
  (server) => {
    
    server.tool(
      'roll_dice',
      'Rolls an N-sided dice',
      {
        sides: z.number().int().min(2)
      },
      async ({ sides }) => {
        const value = 1 + Math.floor(Math.random() * sides)
        return {
          content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }]
        }
      }
    )
  },
  {
    // Optional server options
  },
  {
    basePath: '/api',
    maxDuration: 60,
    verboseLogs: true
  }
)
export { handler as GET, handler as POST, handler as DELETE };
