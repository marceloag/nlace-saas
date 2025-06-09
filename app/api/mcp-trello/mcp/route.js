import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';

const TRELLO_API_BASE_URL = 'https://api.trello.com/1/';
const handler = createMcpHandler(
  (server) => {
    server.tool(
      'get_current_member',
      'Gets information about the current user based on the provided API token.',
      {
        fields: z
          .string()
          .optional()
          .describe(
            'Comma-separated list of member fields to return. Defaults to "all".'
          )
      },
      async ({ fields }) => {
        const params = new URLSearchParams();
        if (fields) params.append('fields', fields);

        const response = await fetch(
          `${TRELLO_API_BASE_URL}/members/me?${params.toString()}&key=${
            process.env.TRELLO_API_KEY
          }&token=${process.env.TRELLO_TOKEN}`
        );
        const data = await response.json();
        return {
          content: [{ type: 'json', json: data }]
        };
      }
    );
    server.tool(
      'get_member_boards',
      'Lists the boards that a specific user is a member of. Requires a member ID.',
      {
        member_id: z.string().describe('The ID or username of the member.'),
        filter: z
          .enum([
            'all',
            'closed',
            'members',
            'open',
            'organization',
            'public',
            'starred'
          ])
          .optional()
          .describe(
            'Filter to apply to the boards. Can be "all", "closed", "members", "open", "organization", "public", or "starred". Defaults to "all".'
          ),
        fields: z
          .string()
          .optional()
          .describe(
            'Comma-separated list of board fields to return. Defaults to "all".'
          ),
        lists: z
          .enum(['all', 'closed', 'none', 'open'])
          .optional()
          .describe(
            'Which lists to include with the boards. Can be "all", "closed", "none", or "open". Defaults to "none".'
          ),
        organization: z
          .boolean()
          .optional()
          .describe(
            'Whether to include the Organization object with the Boards. Defaults to false.'
          ),
        organization_fields: z
          .string()
          .optional()
          .describe(
            'Comma-separated list of organization fields to return if organization is true. Defaults to "name,displayName".'
          )
      },
      async ({
        member_id,
        filter,
        fields,
        lists,
        organization,
        organization_fields
      }) => {
        const params = new URLSearchParams();
        if (filter) params.append('filter', filter);
        if (fields) params.append('fields', fields);
        if (lists) params.append('lists', lists);
        if (organization !== undefined)
          params.append('organization', organization.toString());
        if (organization_fields)
          params.append('organization_fields', organization_fields);

        const response = await fetch(
          `${TRELLO_API_BASE_URL}/members/${member_id}/boards?${params.toString()}&key=${
            process.env.TRELLO_API_KEY
          }&token=${process.env.TRELLO_TOKEN}`
        );
        const data = await response.json();
        return {
          content: [{ type: 'json', json: data }]
        };
      }
    );
    // Tool para obtener las tarjetas en un tablero dado, ahora requiriendo el board_id como parámetro explícito
    server.tool(
      'get_cards_in_board',
      'Get cards in a given Trello board. Requires a board ID.',
      {
        board_id: z.string().describe('The Trello board ID.'),
        filter: z
          .enum([
            'all',
            'closed',
            'complete',
            'incomplete',
            'none',
            'open',
            'visible'
          ])
          .optional()
          .describe('Filter to apply to the cards. Defaults to "visible".')
      },
      async ({ board_id, filter }) => {
        const params = new URLSearchParams();
        if (filter) params.append('filter', filter);

        const response = await fetch(
          `${TRELLO_API_BASE_URL}/boards/${board_id}/cards?${params.toString()}&key=${
            process.env.TRELLO_API_KEY
          }&token=${process.env.TRELLO_TOKEN}`
        );
        const data = await response.json();
        return {
          content: [{ type: 'json', json: data }]
        };
      }
    );
    // Tool para obtener las listas en un tablero dado, ahora requiriendo el board_id como parámetro explícito
    server.tool(
      'get_lists_on_board',
      'Get the lists on a given Trello board. Requires a board ID.',
      {
        board_id: z.string().describe('The Trello board ID.'),
        cards: z
          .enum(['all', 'closed', 'none', 'open', 'visible'])
          .optional()
          .describe(
            'Filter to apply to Cards within the lists. Defaults to "none".'
          ),
        card_fields: z
          .string()
          .optional()
          .describe(
            'Comma-separated list of card fields to return if cards are included. Defaults to "all".'
          ),
        filter: z
          .enum(['all', 'closed', 'none', 'open'])
          .optional()
          .describe('Filter to apply to the lists. Defaults to "open".'),
        fields: z
          .string()
          .optional()
          .describe(
            'Comma-separated list of list fields to return. Defaults to "all".'
          )
      },
      async ({ board_id, cards, card_fields, filter, fields }) => {
        const params = new URLSearchParams();
        if (cards) params.append('cards', cards);
        if (card_fields) params.append('card_fields', card_fields);
        if (filter) params.append('filter', filter);
        if (fields) params.append('fields', fields);

        const response = await fetch(
          `${TRELLO_API_BASE_URL}/boards/${board_id}/lists?${params.toString()}&key=${
            process.env.TRELLO_API_KEY
          }&token=${process.env.TRELLO_TOKEN}`
        );
        const data = await response.json();
        return {
          content: [{ type: 'json', json: data }]
        };
      }
    );
    // Tool para crear una tarjeta en un tablero dado
    server.tool(
      'create_card',
      'Creates a new card on a Trello list. Requires a list ID.',
      {
        name: z.string().describe('The name for the card.'),
        idList: z
          .string()
          .describe('The ID of the list the card should be created in.'),
        desc: z.string().optional().describe('The description for the card.'),
        pos: z
          .union([z.literal('top'), z.literal('bottom'), z.number().gte(0)])
          .optional()
          .describe(
            'The position of the new card. "top", "bottom", or a positive float.'
          )
      },
      async ({ name, idList, desc, pos }) => {
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('idList', idList);
        if (desc) params.append('desc', desc);
        if (pos) params.append('pos', pos.toString());

        const response = await fetch(
          `${TRELLO_API_BASE_URL}/cards?${params.toString()}&key=${
            process.env.TRELLO_API_KEY
          }&token=${process.env.TRELLO_TOKEN}`,
          { method: 'POST' }
        );
        const data = await response.json();
        return {
          content: [{ type: 'json', json: data }]
        };
      }
    );
  },
  {
    // Optional server options
  },
  {
    basePath: '/api/mcp-trello',
    maxDuration: 60,
    verboseLogs: true
  }
);

export { handler as GET, handler as POST, handler as DELETE };
