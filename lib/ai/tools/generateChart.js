import { tool } from 'ai';
import { z } from 'zod';

export const generateChart = tool({
  name: 'generateChart',
  description: 'Generates a bar chart from the given data',
  parameters: z.object({
    data: z.array(
      z
        .object({
          key: z.string(),
          value: z.number()
        })
        .and(z.record(z.string(), z.unknown()))
        .describe('Array de objetos con datos en formato clave-valor')
    ),
    indexKey: z
      .string()
      .describe('Propiedad para el eje X (nombres de categorías)'),
    valueKeys: z
      .array(z.string())
      .describe('Propiedad para el eje Y (valores a graficar)'),
    title: z.string().describe('Título del gráfico'),
    orientation: z
      .enum(['horizontal', 'vertical'])
      .describe('Orientación del gráfico'),
    colors: z
      .array(z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))
      .describe('Colores de las distintas variables en formato hexadecimal')
  }),
  execute: async ({
    data,
    indexKey,
    valueKeys,
    title,
    orientation,
    colors
  }) => {
    return {
      data,
      indexKey,
      valueKeys,
      title,
      orientation,
      colors
    };
  }
});
