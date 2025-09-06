
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IndianRupee, Repeat, Info, ArrowLeft, Loader2 } from "lucide-react";
import { getTokenData, TokenData } from '@/ai/flows/getTokenData';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BuyWithInrPage() {
    const [tokenData, setTokenData] = useState<TokenData | null>(null);
    const [inrAmount, setInrAmount] = useState("1000");
    const [eglifeAmount, setEglifeAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        const fetchData = async () => {
            try {
                const data = await getTokenData();
                setTokenData(data);
            } catch (error) {
                console.error("Failed to fetch token data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (tokenData && inrAmount) {
            const inrValue = parseFloat(inrAmount);
            // Assuming 1 USD = 83 INR for calculation
            const usdAmount = inrValue / 83;
            const calculatedEglife = usdAmount / tokenData.priceUsd;
            setEglifeAmount(calculatedEglife.toFixed(2));
        } else {
            setEglifeAmount("");
        }
    }, [inrAmount, tokenData]);

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <IndianRupee className="h-7 w-7 text-primary" />
                        Buy EGLIFE with INR
                    </CardTitle>
                    <CardDescription>Enter the amount you wish to purchase. The service is coming soon.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="inr-amount">You Pay</Label>
                        <div className="relative">
                             <Input 
                                id="inr-amount" 
                                type="number"
                                value={inrAmount}
                                onChange={(e) => setInrAmount(e.target.value)}
                                className="pl-10"
                                placeholder="0.00"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">INR</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <Repeat className="h-6 w-6 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="eglife-amount">You Receive (estimated)</Label>
                         <div className="relative">
                             <Input 
                                id="eglife-amount" 
                                type="text"
                                value={loading ? "Calculating..." : eglifeAmount}
                                readOnly
                                className="pl-10"
                                placeholder="0.00"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">EGLIFE</span>
                        </div>
                        {loading && <p className="text-xs text-muted-foreground flex items-center gap-2"><Loader2 className="h-3 w-3 animate-spin"/>Fetching live price...</p>}
                    </div>

                     <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Feature Under Development</AlertTitle>
                        <AlertDescription>
                          We are currently integrating with a secure third-party payment provider to enable seamless INR transactions. This feature will be available soon.
                        </AlertDescription>
                    </Alert>

                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" size="lg" disabled>
                        Proceed to Buy
                    </Button>
                    {isClient && (
                         <Button asChild variant="outline" className="w-full" onClick={() => router.back()}>
                            <Link href="#">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
