"use client"

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IndianRupee, Repeat, Info, ArrowLeft, Loader2, Upload } from "lucide-react";
import { getTokenData, TokenData } from '@/ai/flows/getTokenData';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db, storage } from "@/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";

const EglifeUpiBuyPage = () => {
    const [tokenData, setTokenData] = useState<TokenData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    // Form State
    const [amountInInr, setAmountInInr] = useState("");
    const [usdtPriceInInr] = useState(90); // 1 USDT = ₹90 (Can be made dynamic later)
    
    const [form, setForm] = useState({
        mobile: "",
        walletAddress: "",
        txnId: "",
    });
    const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const tokensToReceive = (() => {
        if (!amountInInr || !usdtPriceInInr || !tokenData) return 0;
        const inr = Number(amountInInr);
        const usdtRate = Number(usdtPriceInInr);
        const eglifePerUsd = tokenData.priceUsd > 0 ? 1 / tokenData.priceUsd : 0;
        if (inr <= 0 || usdtRate <= 0) return 0;

        const usdtAmount = inr / usdtRate;
        return usdtAmount * eglifePerUsd;
    })();

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(tokensToReceive <= 0) {
            toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter a valid amount." });
            return;
        }
        if (!screenshotFile) {
            toast({ variant: "destructive", title: "Screenshot Required", description: "Please upload a payment screenshot." });
            return;
        }

        setIsSubmitting(true);
        try {
            let screenshotUrl = "";
            if (screenshotFile) {
                const fileRef = ref(storage, `upiScreenshots/${Date.now()}_${screenshotFile.name}`);
                await uploadBytes(fileRef, screenshotFile);
                screenshotUrl = await getDownloadURL(fileRef);
            }

            const docRef = await addDoc(collection(db, "upi_buy_requests"), {
                ...form,
                amountInInr: Number(amountInr),
                usdtPriceInInr: Number(usdtPriceInInr),
                tokensToReceive,
                screenshotUrl,
                status: "pending", // admin can later update this to "completed"
                createdAt: serverTimestamp(),
            });

            toast({
                title: "Request Submitted!",
                description: `Your request (Ref ID: ${docRef.id.slice(0,10)}...) has been sent. Admin will verify and transfer EGLIFE tokens.`
            });

            // Reset form
            setForm({ mobile: "", walletAddress: "", txnId: "" });
            setScreenshotFile(null);
            setAmountInInr("");

        } catch (err) {
            console.error(err);
            toast({ variant: "destructive", title: "Submission Failed", description: "Could not save your request. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isClient) {
        return (
            <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-3xl">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                        <IndianRupee className="h-8 w-8 text-primary"/>
                    </div>
                    <CardTitle className="font-headline text-3xl">Buy EGLIFE with UPI</CardTitle>
                    <CardDescription>Follow the steps below to purchase EGLIFE tokens using UPI payment.</CardDescription>
                </CardHeader>
            </Card>

            <Card className="mt-8">
                 <CardHeader>
                    <CardTitle className="font-headline">Step 1: Make UPI Payment</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <Alert>
                        <IndianRupee className="h-4 w-4"/>
                        <AlertTitle>Pay to this UPI ID</AlertTitle>
                        <AlertDescription className="font-mono text-lg break-all">
                            7545978703@upi
                        </AlertDescription>
                    </Alert>
                    <p className="text-xs text-muted-foreground mt-4">Note: Payment must be made from your own UPI account. Third-party payments are not accepted.</p>
                 </CardContent>
            </Card>
            
            <form onSubmit={handleSubmit}>
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="font-headline">Step 2: Fill Payment Details</CardTitle>
                        <CardDescription>After making the payment, fill out this form to submit your request.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="amountInInr">Amount Paid (INR)</Label>
                            <Input id="amountInInr" type="number" placeholder="e.g., 1000" value={amountInr} onChange={(e) => setAmountInInr(e.target.value)} required />
                        </div>

                        <div className="p-4 rounded-lg border bg-muted/50 text-center">
                            <p className="text-sm text-muted-foreground">You will receive (approx.)</p>
                            <p className="text-2xl font-bold">{loading ? <Loader2 className="h-6 w-6 animate-spin mx-auto"/> : `${tokensToReceive.toFixed(2)} EGLIFE`}</p>
                            {tokenData && <p className="text-xs text-muted-foreground mt-1">1 EGLIFE ≈ ₹{(1 / tokenData.priceUsd * usdtPriceInInr).toFixed(3)}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="walletAddress">Your BSC Wallet Address</Label>
                            <Input id="walletAddress" name="walletAddress" placeholder="0x... (Your BEP-20 wallet to receive EGLIFE)" value={form.walletAddress} onChange={handleFormChange} required />
                        </div>
                        
                         <div className="space-y-2">
                            <Label htmlFor="txnId">UPI Transaction ID / UTR</Label>
                            <Input id="txnId" name="txnId" placeholder="Enter the 12-digit transaction ID" value={form.txnId} onChange={handleFormChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number (for contact)</Label>
                            <Input id="mobile" name="mobile" placeholder="Your Mobile Number" value={form.mobile} onChange={handleFormChange} required />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="screenshot">Payment Screenshot (Required)</Label>
                            <Input id="screenshot" type="file" onChange={(e) => setScreenshotFile(e.target.files ? e.target.files[0] : null)} className="pt-2" required/>
                             <p className="text-xs text-muted-foreground">Upload a screenshot of the successful payment for faster verification.</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                         <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Submitting...</> : "Submit Buy Request"}
                         </Button>
                         <Button asChild variant="outline" className="w-full" onClick={() => router.back()}>
                            <Link href="#"><ArrowLeft className="mr-2 h-4 w-4" /> Go Back</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default EglifeUpiBuyPage;

    