import { tool } from 'ai';
import { z } from 'zod';

export const generatePosts = tool({
  name: 'generatePosts',
  description: 'format created posts for social media',
  parameters: z.object({
    posts: z
      .array(
        z.object({
          hashtags: z
            .string()
            .describe(
              'Hashtags separados por espacios, cada uno comenzando con #'
            ),
          fecha_publicacion: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, {
              message: 'Formato debe ser YYYY-MM-DD'
            })
            .describe('Fecha de publicación en formato YYYY-MM-DD'),
          hora_publicacion: z
            .string()
            .regex(/^\d{2}:\d{2}$/, { message: 'Formato debe ser HH:MM' })
            .describe('Hora de publicación en formato HH:MM (24 horas)'),
          text: z.string().describe('Texto del post, puede incluir emojis'),
          platforms: z
            .array(z.enum(['facebook', 'twitter', 'linkedin', 'instagram']))
            .describe('Plataformas donde se publicará el post')
        })
      )
      .min(1)
      .describe('Array de uno o más posts a publicar')
  }),
  execute: async ({ posts }) => {
    return posts;
  }
});
