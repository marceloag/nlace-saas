import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import { experimental_generateImage, tool } from 'ai'

export const generateImages = tool({
  name: 'generateImages',
  description: 'Generates an image based on a prompt',
  parameters: z.object({
    prompt: z.string().describe('The improved prompt to generate the image')
  }),
  execute: async ({ prompt }) => {
    console.log(`Generating image with prompt: ${prompt}`)
    try {
      const { image } = await experimental_generateImage({
        model: openai('gpt-image-1'),
        prompt: prompt,
        n: 1,
        size: '300x300',
        quality: 'hd',
        responseFormat: 'b64_json'
      })
    } catch (error) {
      if (NoImageGeneratedError.isInstance(error)) {
        console.log('NoImageGeneratedError')
        console.log('Cause:', error.cause)
        console.log('Responses:', error.responses)
      }
    }
    console.log('Image generated:')
    console.log(image)
    return { image: image.base64, prompt }
  }
})
