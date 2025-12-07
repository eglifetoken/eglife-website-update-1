
'use server';
/**
 * @fileOverview A Genkit flow to fetch mobile recharge plans from the Paysprint API.
 * 
 * - getRechargePlans - Fetches available recharge plans for a given operator and circle.
 * - RechargePlansInput - Input schema for fetching plans.
 * - RechargePlan - Individual plan schema.
 * - RechargePlansOutput - Output schema for the list of plans.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as jose from 'jose';
import { v4 as uuidv4 } from 'uuid';

// Schemas
const RechargePlansInputSchema = z.object({
  operatorCode: z.string().describe("The code for the mobile operator."),
  circleCode: z.string().describe("The code for the telecom circle (e.g., '1' for Andhra Pradesh). Defaults to '20' for 'pan india' if not provided"),
});
export type RechargePlansInput = z.infer<typeof RechargePlansInputSchema>;

const RechargePlanSchema = z.object({
  amount: z.string(),
  detail: z.string(),
  validity: z.string(),
  talktime: z.string(),
});
export type RechargePlan = z.infer<typeof RechargePlanSchema>;

const RechargePlansOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  plans: z.array(RechargePlanSchema).optional(),
});
export type RechargePlansOutput = z.infer<typeof RechargePlansOutputSchema>;


/**
 * Creates a JWT token for Paysprint API authentication.
 */
async function createJwtToken(): Promise<string> {
    const jwtSecret = process.env.PAYSPRINT_JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('PAYSPRINT_JWT_SECRET is not defined in environment variables.');
    }
    const secret = new TextEncoder().encode(jwtSecret);
    const now = Math.floor(Date.now() / 1000);
    const partnerId = process.env.PAYSPRINT_PARTNER_ID || "PS002091";

    return new jose.SignJWT({
        timestamp: now.toString(),
        partnerId: partnerId,
        reqid: uuidv4()
    })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime('5m')
    .sign(secret);
}

// Exported function to be called from the client
export async function getRechargePlans(input: RechargePlansInput): Promise<RechargePlansOutput> {
  return getRechargePlansFlow(input);
}


const getRechargePlansFlow = ai.defineFlow(
  {
    name: 'getRechargePlansFlow',
    inputSchema: RechargePlansInputSchema,
    outputSchema: RechargePlansOutputSchema,
  },
  async ({ operatorCode, circleCode }) => {
    const baseUrl = process.env.PAYSPRINT_UAT_BASE_URL;
    const authorisedKey = process.env.PAYSPRINT_AUTHORISED_KEY;

    if (!baseUrl || !authorisedKey) {
      throw new Error('Paysprint API credentials are not fully configured.');
    }

    try {
        const jwtToken = await createJwtToken();
        const response = await fetch(`${baseUrl}api/v1/recharge/getplan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorisedkey': authorisedKey,
                'token': jwtToken,
            },
            body: JSON.stringify({
                operator: operatorCode,
                circle: circleCode || '20', // Default to Pan India
            }),
        });
        
        const data = await response.json();

        if (response.ok && data.status === true && Array.isArray(data.data)) {
             const plans = data.data.map((plan: any) => ({
                amount: plan.rs,
                detail: plan.desc,
                validity: plan.validity,
                talktime: plan.talktime || "N/A",
            }));

            return {
                success: true,
                message: 'Plans fetched successfully.',
                plans,
            };
        } else {
             return {
                success: false,
                message: data.message || 'Failed to fetch recharge plans from the provider.',
            };
        }

    } catch (error: any) {
        console.error('Error in getRechargePlansFlow:', error);
        return {
            success: false,
            message: error.message || 'An unexpected error occurred while fetching plans.',
        };
    }
  }
);
