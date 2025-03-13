import { tool } from 'ai';
import { z } from 'zod';
import { searchSimilarDocuments } from '@/lib/ai/embeddings';

export const getKnowledgeBase = tool({
  name: 'getKnowledgeBase',
  description:
    'This tool is the access the general knowledge base of the brand. Is the principal source of truth and must be executed always. If it doesnt find anything or the response is empty pass a response to the agent saying this in spanish',
  parameters: z.object({
    accountId: z.number().describe('the account id to search'),
    prompt: z.string().describe('the user prompt')
  }),
  execute: async ({ prompt, accountId }) =>
    searchSimilarDocuments(prompt, 7, { accountId })
});
