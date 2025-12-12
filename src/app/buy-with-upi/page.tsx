
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { IndianRupee, Repeat, Loader2, ArrowLeft, CheckCircle, Info, ShieldCheck } from "lucide-react";
import { getTokenData, TokenData } from '@/ai/flows/getTokenData';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function BuyWithUpiPage() {
    const [tokenData, setTokenData] = useState<TokenData | null>(null);
    const [inrAmount, setInrAmount] = useState("1000");
    const [eglifeAmount, setEglifeAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPaymentDialogVisible, setIsPaymentDialogVisible] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const { toast } = useToast();
    const [upiId, setUpiId] = useState("");
    const [isUpiIdLoading, setIsUpiIdLoading] = useState(true);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        const fetchUpiId = async () => {
            setIsUpiIdLoading(true);
            try {
                const docRef = doc(db, "settings", "upi");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().id) {
                    setUpiId(docSnap.data().id);
                } else {
                    setUpiId("7545978703-6@ibl"); // Fallback
                }
            } catch (error) {
                console.error("Error fetching UPI ID:", error);
                setUpiId("7545978703-6@ibl"); // Fallback on error
                 toast({ variant: "destructive", title: "Could not fetch UPI details", description: "Defaulting to system UPI. Please check your connection." });
            } finally {
                setIsUpiIdLoading(false);
            }
        };

        fetchUpiId();
    }, [toast]);

    useEffect(() => {
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
            const usdtRate = 90; // Assuming 1 USD = 90 INR
            const usdAmount = inrValue / usdtRate;
            const calculatedEglife = tokenData.priceUsd > 0 ? (usdAmount / tokenData.priceUsd) : 0;
            setEglifeAmount(calculatedEglife.toFixed(2));
        } else {
            setEglifeAmount("");
        }
    }, [inrAmount, tokenData]);

    const handleProceedToPay = () => {
        if (!walletAddress) {
            toast({ variant: "destructive", title: "Wallet Address Required", description: "Please enter your BEP-20 wallet address to receive tokens." });
            return;
        }
        setIsPaymentDialogVisible(true);
        setPaymentSuccess(false);
        setIsProcessingPayment(false);
    }

    const handleSimulatePayment = async () => {
        setIsProcessingPayment(true);
        // Simulate API call to payment gateway
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // On success from gateway
        setPaymentSuccess(true);
        setIsProcessingPayment(false);

        // Now, submit the request to our backend for token transfer
        await handleSubmitRequest();
    }


    const handleSubmitRequest = async () => {
        setIsSubmitting(true);
        try {
             const docRef = await addDoc(collection(db, "upi_buy_requests"), {
                amountInInr: Number(inrAmount),
                tokensToReceive: parseFloat(eglifeAmount),
                walletAddress,
                status: "pending",
                paymentStatus: "paid",
                createdAt: serverTimestamp(),
            });

            toast({
                title: "Request Submitted!",
                description: `Admin will verify and transfer ${eglifeAmount} EGLIFE to your wallet. Ref: ${docRef.id.slice(0,10)}...`
            });

        } catch (err) {
            console.error(err);
            toast({ variant: "destructive", title: "Submission Failed", description: "Could not save your request. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    }
    
     const closeAndReset = () => {
        setIsPaymentDialogVisible(false);
        setWalletAddress("");
        setInrAmount("1000");
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-2">
                            <IndianRupee className="h-7 w-7 text-primary" />
                            Buy EGLIFE with UPI
                        </CardTitle>
                        <CardDescription>A fast and easy way to buy EGLIFE tokens directly using UPI.</CardDescription>
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
                        <div className="space-y-2 pt-4">
                            <Label htmlFor="walletAddress">Your BEP-20 Wallet Address</Label>
                             <Input id="walletAddress" placeholder="Enter the 0x... address where you'll receive tokens" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" size="lg" disabled={!inrAmount || parseFloat(inrAmount) <= 0 || !walletAddress} onClick={handleProceedToPay}>
                            Proceed to Pay
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                                <Link href="/">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                                </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Dialog open={isPaymentDialogVisible} onOpenChange={setIsPaymentDialogVisible}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-xl">Confirm Your Purchase</DialogTitle>
                         <DialogDescription>
                            Review your order before proceeding to the secure payment gateway.
                        </DialogDescription>
                    </DialogHeader>
                    
                    {!paymentSuccess ? (
                        <div className="space-y-6 py-4">
                            <div className="p-4 rounded-lg border bg-muted/50">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-muted-foreground">You Pay</span>
                                    <span className="font-bold">₹{inrAmount}</span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                     <span className="text-muted-foreground">You Get (approx.)</span>
                                    <span className="font-bold">{eglifeAmount} EGLIFE</span>
                                </div>
                            </div>
                             <div className="p-4 rounded-lg border">
                                <p className="text-xs text-muted-foreground mb-1">Tokens will be sent to:</p>
                                <p className="text-xs font-mono break-all">{walletAddress}</p>
                            </div>
                            <Button className="w-full" size="lg" onClick={handleSimulatePayment} disabled={isProcessingPayment}>
                                {isProcessingPayment ? 
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing Payment...</> : 
                                    <>Pay with UPI / QR</>
                                }
                            </Button>
                             <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <ShieldCheck className="h-4 w-4"/>
                                <span>Powered by EGPAY Secure Gateway</span>
                            </div>
                        </div>
                    ) : (
                         <div className="space-y-6 py-4 text-center">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                            <h2 className="text-xl font-bold">Payment Successful!</h2>
                            <p className="text-muted-foreground">Your request has been submitted. The admin will verify your payment and transfer {eglifeAmount} EGLIFE tokens to your wallet shortly.</p>
                            <Button className="w-full" onClick={closeAndReset}>Done</Button>
                        </div>
                    )}
                   

                </DialogContent>
            </Dialog>
        </>
    );
}