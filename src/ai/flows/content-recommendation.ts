// src/ai/flows/content-recommendation.ts
'use server';

/**
 * @fileOverview A content recommendation AI agent that provides personalized content recommendations based on user interests.
 *
 * - recommendContent - A function that generates content recommendations.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  interests: z
    .string()
    .describe(
      'The user interests, comma separated, such as wellness, sustainability, community projects'
    ),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('Personalized content recommendations based on interests.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are a content recommendation engine for the Egli Life Token project.

  Based on the user's interests, provide personalized content recommendations sourced exclusively from eglifetoken.xyz.

  Interests: {{{interests}}}
  `,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
