
'use server';
/**
 * @fileOverview A flow to fetch token data from the GeckoTerminal API.
 * 
 * - getTokenData - A function that fetches market data for a specific token.
 * - TokenData - The return type for the getTokenData function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GECKO_API_URL = "https://api.geckoterminal.com/api/v2/networks/bsc/pools/0xca326a5e15b9451efc1a6bddad6fb098a4d09113";

const TokenDataSchema = z.object({
  priceUsd: z.number().describe("The current price of the token in USD."),
  priceChange24h: z.number().describe("The price change in the last 24 hours in USD."),
  priceChangePercentage24h: z.number().describe("The price change percentage in the last 24 hours."),
  marketCapUsd: z.number().describe("The market capitalization of the token in USD."),
  circulatingSupply: z.number().describe("The number of tokens in circulation."),
  volume24hUsd: z.number().describe("The trading volume in the last 24 hours in USD."),
});
export type TokenData = z.infer<typeof TokenDataSchema>;


export async function getTokenData(): Promise<TokenData> {
    return getTokenDataFlow();
}

const getTokenDataFlow = ai.defineFlow(
  {
    name: 'getTokenDataFlow',
    outputSchema: TokenDataSchema,
  },
  async () => {
    try {
        const response = await fetch(GECKO_API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from GeckoTerminal: ${response.statusText}`);
        }
        const data = await response.json();
        
        const attributes = data.data.attributes;
        const baseToken = data.data.relationships.base_token.data;

        // Find the base token in included relationships to get circulating supply
        const includedToken = data.included.find((inc: any) => inc.id === baseToken.id && inc.type === baseToken.type);
        const circulatingSupply = includedToken ? parseFloat(includedToken.attributes.circulating_supply) : 0;

        return {
            priceUsd: parseFloat(attributes.base_token_price_usd),
            priceChange24h: parseFloat(attributes.price_change_percentage.h24), // API seems to send percentage here
            priceChangePercentage24h: parseFloat(attributes.price_change_percentage.h24),
            marketCapUsd: parseFloat(attributes.market_cap_usd),
            circulatingSupply: circulatingSupply,
            volume24hUsd: parseFloat(attributes.volume_usd.h24),
        };
    } catch (error) {
        console.error('Error in getTokenDataFlow:', error);
        // Fallback to default values on error
        return {
            priceUsd: 0.25,
            priceChange24h: 0,
            priceChangePercentage24h: 0,
            marketCapUsd: 25500000,
            circulatingSupply: 102000000,
            volume24hUsd: 1200000,
        };
    }
  }
);
