
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { IndianRupee, Repeat, Loader2, ArrowLeft, CheckCircle, Info } from "lucide-react";
import { getTokenData, TokenData } from '@/ai/flows/getTokenData';
import Link from 'next/link';
import QRCode from "qrcode.react";
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
    const [isQrVisible, setIsQrVisible] = useState(false);
    const [txnId, setTxnId] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const { toast } = useToast();
    const [upiId, setUpiId] = useState("loading...");

    useEffect(() => {
        const fetchUpiId = async () => {
            try {
                const docRef = doc(db, "settings", "upi");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().id) {
                    setUpiId(docSnap.data().id);
                } else {
                    setUpiId("default.upi@provider"); // Fallback
                }
            } catch (error) {
                console.error("Error fetching UPI ID:", error);
                setUpiId("default.upi@provider"); // Fallback
            }
        };

        fetchUpiId();
    }, []);

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

    const qrValue = `upi://pay?pa=${upiId}&pn=EGLIFE TOKEN&am=${inrAmount}&cu=INR`;

    const handleSubmitRequest = async () => {
        if (!txnId || !walletAddress || !mobileNumber) {
            toast({ variant: "destructive", title: "Missing Details", description: "Please provide your Wallet Address, Transaction ID and Mobile Number." });
            return;
        }

        setIsSubmitting(true);
        try {
             const docRef = await addDoc(collection(db, "upi_buy_requests"), {
                amountInInr: Number(inrAmount),
                tokensToReceive: parseFloat(eglifeAmount),
                walletAddress,
                mobileNumber,
                txnId,
                status: "pending",
                createdAt: serverTimestamp(),
            });

            toast({
                title: "Request Submitted!",
                description: `Your request (Ref ID: ${docRef.id.slice(0,10)}...) has been sent. Admin will verify and transfer EGLIFE tokens.`
            });

            // Reset form and close dialog
            setTxnId("");
            setMobileNumber("");
            setWalletAddress("");
            setInrAmount("1000");
            setIsQrVisible(false);

        } catch (err) {
            console.error(err);
            toast({ variant: "destructive", title: "Submission Failed", description: "Could not save your request. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
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
                        <CardDescription>Enter the amount you wish to purchase.</CardDescription>
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
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" size="lg" disabled={!inrAmount || parseFloat(inrAmount) <= 0} onClick={() => setIsQrVisible(true)}>
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

            <Dialog open={isQrVisible} onOpenChange={setIsQrVisible}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-xl">Step 1: Scan & Pay</DialogTitle>
                        <DialogDescription>
                            Use any UPI app to scan the QR code below or pay to <strong>{upiId}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg">
                        {upiId === "loading..." ? <Loader2 className="h-12 w-12 animate-spin"/> : <QRCode value={qrValue} size={200} />}
                    </div>
                    <div className="text-center font-mono text-lg">
                        Amount: <strong>₹{inrAmount}</strong>
                    </div>

                    <div className="space-y-4 pt-4">
                         <Alert variant="default" className="border-primary/50">
                            <Info className="h-4 w-4" />
                            <AlertTitle className="font-bold">Step 2: Submit Details</AlertTitle>
                            <AlertDescription>After payment, enter your wallet address and the UPI Transaction ID below to receive your tokens.</AlertDescription>
                        </Alert>
                         <div className="space-y-2">
                            <Label htmlFor="walletAddress">Your BEP-20 Wallet Address</Label>
                            <Input id="walletAddress" placeholder="0x..." value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="txnId">UPI Transaction ID / UTR</Label>
                            <Input id="txnId" placeholder="12-digit transaction ID" value={txnId} onChange={(e) => setTxnId(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="mobileNumber">Mobile Number (for contact)</Label>
                            <Input id="mobileNumber" placeholder="Your Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsQrVisible(false)}>Cancel</Button>
                        <Button type="button" onClick={handleSubmitRequest} disabled={isSubmitting}>
                            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Submitting...</> : <><CheckCircle className="mr-2 h-4 w-4"/>Confirm & Submit</>}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
