
'use server';
/**
 * @fileOverview A Genkit flow to handle mobile recharge requests via the Paysprint API.
 * 
 * - mobileRecharge - A function to initiate a mobile recharge.
 * - MobileRechargeInput - The input type for the mobileRecharge function.
 * - MobileRechargeOutput - The return type for the mobileRecharge function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as jose from 'jose';
import { v4 as uuidv4 } from 'uuid';

// Define input schema for the recharge flow
const MobileRechargeInputSchema = z.object({
  mobileNumber: z.string().length(10, { message: "Mobile number must be 10 digits." }),
  operatorCode: z.string().min(1, { message: "Operator code is required." }),
  amount: z.number().positive({ message: "Amount must be greater than zero." }),
});
export type MobileRechargeInput = z.infer<typeof MobileRechargeInputSchema>;

// Define output schema for the recharge flow
const MobileRechargeOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  transactionId: z.string().optional(),
  operatorRef: z.string().optional(),
});
export type MobileRechargeOutput = z.infer<typeof MobileRechargeOutputSchema>;


/**
 * Creates a JWT token for Paysprint API authentication.
 * @returns The generated JWT token.
 */
async function createJwtToken(): Promise<string> {
    const jwtSecret = process.env.PAYSPRINT_JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('PAYSPRINT_JWT_SECRET is not defined in environment variables.');
    }

    const secret = new TextEncoder().encode(jwtSecret);
    const now = Math.floor(Date.now() / 1000);
    const partnerId = process.env.PAYSPRINT_PARTNER_ID || "PS002091";

    const token = await new jose.SignJWT({
        "timestamp": now.toString(),
        "partnerId": partnerId,
        "reqid": uuidv4() // Unique request ID
    })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime('5m') // Token is valid for 5 minutes
    .sign(secret);
    
    return token;
}


export async function mobileRecharge(input: MobileRechargeInput): Promise<MobileRechargeOutput> {
  return mobileRechargeFlow(input);
}


const mobileRechargeFlow = ai.defineFlow(
  {
    name: 'mobileRechargeFlow',
    inputSchema: MobileRechargeInputSchema,
    outputSchema: MobileRechargeOutputSchema,
  },
  async (input) => {
    const { mobileNumber, operatorCode, amount } = input;
    
    const baseUrl = process.env.PAYSPRINT_UAT_BASE_URL;
    const authorisedKey = process.env.PAYSPRINT_AUTHORISED_KEY;

    if (!baseUrl || !authorisedKey) {
        throw new Error('Paysprint API credentials are not fully configured.');
    }

    try {
        const jwtToken = await createJwtToken();

        const response = await fetch(`${baseUrl}api/v1/recharge/dorecharge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorisedkey': authorisedKey,
                'token': jwtToken,
            },
            body: JSON.stringify({
                number: mobileNumber,
                operator: operatorCode,
                amount: amount,
                referenceid: uuidv4() // Unique reference for this transaction
            }),
        });

        // The API might return HTML (e.g., an error page) which isn't valid JSON.
        // We need to handle this gracefully.
        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
             return {
                success: false,
                message: 'Received an invalid response from the recharge provider. Please try again later.',
            };
        }


        // Based on Paysprint documentation, a successful response has status 'true' or '2' (pending)
        if (response.ok && (data.status === true || data.status === 2)) {
            return {
                success: true,
                message: data.message || 'Recharge submitted successfully.',
                transactionId: data.ackno,
                operatorRef: data.operatorid,
            };
        } else {
             return {
                success: false,
                message: data.message || 'Failed to process recharge from the provider.',
            };
        }

    } catch (error: any) {
        console.error('Error in mobileRechargeFlow:', error);
        return {
            success: false,
            message: error.message || 'An unexpected error occurred during the recharge process.',
        };
    }
  }
);
