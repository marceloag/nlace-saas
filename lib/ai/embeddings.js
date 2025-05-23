import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';
import { Pinecone } from '@pinecone-database/pinecone';

export const generateEmbedding = async (value) => {
  const input = value.replaceAll('\\n', ' ');
  const { embedding, usage } = await embed({
    model: openai.embedding('text-embedding-3-large'),
    value: input
  });
  console.log('Embedding usage:', usage);
  return embedding;
};

export async function searchSimilarDocuments(prompt, topK, metadata) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
  });
  try {
    const vector = await generateEmbedding(prompt);
    const index = pinecone.index('nlace');
    console.log('Search similar Documents account id', metadata.accountId);
    const filter = {
      ...(metadata.accountId && { accountId: metadata.accountId })
    };
    console.log('Filter:', filter);

    const queryResult = await index.query({
      vector,
      topK: topK,
      includeMetadata: true,
      includeValues: false,
      filter: filter
    });

    const results = queryResult.matches.map((match) => ({
      pageContent: match.metadata.pageContent || '',
      metadata: match.metadata,
      score: match.score
    }));
    console.log('Results:', results);
    console.log('Query result:', queryResult);
    return results;
  } catch (error) {
    console.error('Error en la búsqueda de similaridad:', error);
    return [];
  }
}
