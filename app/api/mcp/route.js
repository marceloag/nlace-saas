// app/api/[transport]/route.js
import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';

const METRICOOL_API_BASE_URL = 'https://app.metricool.com/api';

const DEFAULT_USER_TOKEN = process.env.NEXT_PUBLIC_METRICOOL_USER_TOKEN || '';
const DEFAULT_USER_ID = process.env.NEXT_PUBLIC_METRICOOL_USER_ID || '';
const DEFAULT_BLOG_ID = process.env.NEXT_PUBLIC_METRICOOL_BLOG_ID || '';

function getMetricoolAuthParams(userToken, userId, blogId) {
  const finalUserToken = userToken || DEFAULT_USER_TOKEN;
  const finalUserId = userId || DEFAULT_USER_ID;
  const finalBlogId = blogId || DEFAULT_BLOG_ID;

  if (!finalUserToken || !finalUserId || !finalBlogId) {
    throw new Error(
      'Metricool credentials (userToken, userId, blogId) are required. Please set them in .env.local or provide as arguments.'
    );
  }
  return { finalUserToken, finalUserId, finalBlogId };
}

const handler = createMcpHandler(
  (server) => {
    server.tool(
      'roll_dice',
      'Rolls an N-sided dice',
      {
        sides: z.number().int().min(2)
      },
      async ({ sides }) => {
        const value = 1 + Math.floor(Math.random() * sides);
        return {
          content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }]
        };
      }
    );
    server.tool(
      'list_user_brands',
      'Lists all brands (profiles) for a given Metricool user.',
      {
        // Hacerlos opcionales en el esquema, pero usaremos los valores por defecto si no se proporcionan
        userToken: z
          .string()
          .optional()
          .describe(
            'The unique authorization code for the user. Defaults to environment variable if not provided.'
          ),
        userId: z
          .string()
          .optional()
          .describe(
            'The user identifier of your Metricool account. Defaults to environment variable if not provided.'
          ),
        blogId: z
          .string()
          .optional()
          .describe(
            'The identification number of the brand (can be any of your brands). Defaults to environment variable if not provided.'
          )
      },
      async ({ userToken, userId, blogId }) => {
        try {
          const { finalUserToken, finalUserId, finalBlogId } =
            getMetricoolAuthParams(userToken, userId, blogId);

          const response = await fetch(
            `${METRICOOL_API_BASE_URL}/admin/simpleProfiles?blogId=${finalBlogId}&userId=${finalUserId}&userToken=${finalUserToken}`
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Metricool API error: ${response.status} - ${
                errorData.message || response.statusText
              }`
            );
          }

          const data = await response.json();
          return {
            content: [{ type: 'json', json: data }]
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error listing user brands: ${error.message}`
              }
            ]
          };
        }
      }
    );
    server.tool(
      'schedule_social_post',
      'Schedules a post as a draft on a specified social media network.',
      {
        userToken: z
          .string()
          .optional()
          .describe(
            'The unique authorization code for the user. Defaults to environment variable if not provided.'
          ),
        userId: z
          .string()
          .optional()
          .describe(
            'The user identifier of your Metricool account. Defaults to environment variable if not provided.'
          ),
        blogId: z
          .string()
          .optional()
          .describe(
            'The identification number of the brand associated with the social media profile. Defaults to environment variable if not provided.'
          ),
        socialNetwork: z
          .enum([
            'facebook',
            'instagram',
            'linkedin',
            'twitter',
            'tiktok',
            'googlemybusiness',
            'pinterest',
            'youtube'
          ])
          .describe(
            'The social media network where the post will be scheduled (e.g., "facebook", "instagram", "linkedin").'
          ),
        postContent: z.string().describe('The main text content of the post.'),
        scheduledDateTime: z
          .string()
          .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
            'Scheduled date and time must be in YYYY-MM-DDTHH:MM:SS format (e.g., 2025-06-05T10:30:00)'
          )
          .describe(
            'The exact date and time when the post should be published in YYYY-MM-DDTHH:MM:SS format.'
          ),
        timezone: z
          .string()
          .optional()
          .describe(
            'The timezone for the scheduled date and time (e.g., "America/Santiago", "Europe/Madrid"). Defaults to "UTC" if not provided.'
          ),
        mediaUrls: z
          .array(z.string().url())
          .optional()
          .describe(
            'An array of URLs for images or videos to be included in the post.'
          ),
        firstCommentText: z
          .string()
          .optional()
          .describe(
            'Text for the first comment on platforms that support it (e.g., Instagram, Facebook).'
          )
      },
      async ({
        userToken,
        userId,
        blogId,
        socialNetwork,
        postContent,
        scheduledDateTime,
        timezone,
        mediaUrls,
        firstCommentText
      }) => {
        try {
          const { finalUserToken, finalUserId, finalBlogId } =
            getMetricoolAuthParams(userToken, userId, blogId);
          const finalTimezone = timezone || 'UTC';

          const postData = {
            providers: [
              {
                network: socialNetwork.toLowerCase()
              }
            ],
            publicationDate: {
              dateTime: scheduledDateTime,
              timezone: finalTimezone
            },
            text: postContent,
            autoPublish: false,
            draft: true
          };

          const response = await fetch(
            `${METRICOOL_API_BASE_URL}/v2/scheduler/posts?blogId=${finalBlogId}&userId=${finalUserId}&userToken=${finalUserToken}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
                // 'X-Mc-Auth': finalUserToken, // Can also send userToken in header
              },
              body: JSON.stringify(postData)
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Metricool API error: ${response.status} - ${
                errorData.message ||
                response.statusText ||
                JSON.stringify(errorData)
              }`
            );
          }

          const data = await response.json();
          return {
            content: [{ type: 'json', json: data }]
          };
        } catch (error) {
          console.error(
            `Error scheduling social post as draft: ${error.message}`
          );
          return {
            content: [
              {
                type: 'text',
                text: `Failed to schedule post as draft: ${error.message}`
              }
            ]
          };
        }
      }
    );
    server.tool(
      'get_brand_info',
      'Retrieves detailed information for a specific brand.',
      {
        userToken: z
          .string()
          .optional()
          .describe(
            'The unique authorization code for the user. Defaults to environment variable if not provided.'
          ),
        userId: z
          .string()
          .optional()
          .describe(
            'The user identifier of your Metricool account. Defaults to environment variable if not provided.'
          ),
        blogId: z
          .string()
          .optional()
          .describe(
            'The identification number of the specific brand you want to retrieve info for. Defaults to environment variable if not provided.'
          )
      },
      async ({ userToken, userId, blogId }) => {
        try {
          const { finalUserToken, finalUserId, finalBlogId } =
            getMetricoolAuthParams(userToken, userId, blogId);

          const response = await fetch(
            `${METRICOOL_API_BASE_URL}/admin/blogInfo?blogId=${finalBlogId}&userId=${finalUserId}&userToken=${finalUserToken}`
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Metricool API error: ${response.status} - ${
                errorData.message || response.statusText
              }`
            );
          }

          const data = await response.json();
          return {
            content: [{ type: 'json', json: data }]
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error getting brand info: ${error.message}`
              }
            ]
          };
        }
      }
    );
    server.tool(
      'get_facebook_page_posts',
      'Retrieves Facebook Page posts statistics.',
      {
        userToken: z
          .string()
          .optional()
          .describe(
            'The unique authorization code for the user. Defaults to environment variable if not provided.'
          ),
        userId: z
          .string()
          .optional()
          .describe(
            'The user identifier of your Metricool account. Defaults to environment variable if not provided.'
          ),
        blogId: z
          .string()
          .optional()
          .describe(
            'The identification number of the brand associated with the Facebook Page. Defaults to environment variable if not provided.'
          ),
        startDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
          .describe('Start date for the data (YYYY-MM-DD).'),
        endDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
          .describe('End date for the data (YYYY-MM-DD).')
      },
      async ({ userToken, userId, blogId, startDate, endDate }) => {
        try {
          const { finalUserToken, finalUserId, finalBlogId } =
            getMetricoolAuthParams(userToken, userId, blogId);

          const response = await fetch(
            `${METRICOOL_API_BASE_URL}/social/facebook/page/posts?blogId=${finalBlogId}&userId=${finalUserId}&userToken=${finalUserToken}&startDate=${startDate}&endDate=${endDate}`
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Metricool API error: ${response.status} - ${
                errorData.message || response.statusText
              }`
            );
          }

          const data = await response.json();
          return {
            content: [{ type: 'json', json: data }]
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error fetching Facebook Page posts: ${error.message}`
              }
            ]
          };
        }
      }
    );
    server.tool(
      'get_instagram_profile_info',
      'Retrieves Instagram Profile general information and statistics.',
      {
        userToken: z
          .string()
          .optional()
          .describe(
            'The unique authorization code for the user. Defaults to environment variable if not provided.'
          ),
        userId: z
          .string()
          .optional()
          .describe(
            'The user identifier of your Metricool account. Defaults to environment variable if not provided.'
          ),
        blogId: z
          .string()
          .optional()
          .describe(
            'The identification number of the brand associated with the Instagram Profile. Defaults to environment variable if not provided.'
          ),
        startDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
          .describe('Start date for the data (YYYY-MM-DD).'),
        endDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
          .describe('End date for the data (YYYY-MM-DD).')
      },
      async ({ userToken, userId, blogId, startDate, endDate }) => {
        try {
          const { finalUserToken, finalUserId, finalBlogId } =
            getMetricoolAuthParams(userToken, userId, blogId);

          const response = await fetch(
            `${METRICOOL_API_BASE_URL}/social/instagram/profile?blogId=${finalBlogId}&userId=${finalUserId}&userToken=${finalUserToken}&startDate=${startDate}&endDate=${endDate}`
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Metricool API error: ${response.status} - ${
                errorData.message || response.statusText
              }`
            );
          }

          const data = await response.json();
          return {
            content: [{ type: 'json', json: data }]
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error fetching Instagram profile info: ${error.message}`
              }
            ]
          };
        }
      }
    );
  },
  {
    // Optional server options
  },
  {
    basePath: '/api',
    maxDuration: 60,
    verboseLogs: true
  }
);

export { handler as GET, handler as POST, handler as DELETE };
