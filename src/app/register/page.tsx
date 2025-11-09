
"use client";

import { useState, useEffect, Suspense } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Wallet, Link2Off, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Image from "next/image";

function RegisterForm() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [sponsorAddress, setSponsorAddress] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    
    useEffect(() => {
        const refFromUrl = searchParams.get('ref');
        const defaultSponsor = "0xf2f000C78519015B91220c7bE3EF26241bEc686f";
        setSponsorAddress(refFromUrl || defaultSponsor);
    }, [searchParams]);


    const handleRegister = async () => {
        if (!sponsorAddress) {
             toast({
                variant: "destructive",
                title: "Sponsor Required",
                description: "A valid sponsor wallet address is required.",
            });
            return;
        }

        setIsRegistering(true);

        // This is a placeholder for the actual registration logic.
        // In a real scenario, you might save the sponsor relationship off-chain
        // or have it as part of a contract interaction.
        console.log("Registering:", { user: address, sponsor: sponsorAddress });
        
        // Simulate a delay for the transaction
        await new Promise(resolve => setTimeout(resolve, 1500));

        // On successful registration:
        toast({
            title: "Registration Successful!",
            description: "Welcome! You will now be redirected to the staking page.",
        });
        
        setIsRegistering(false);
        // Redirect to staking page, preserving the sponsor address in the URL
        router.push(`/staking?ref=${sponsorAddress}`);
    };

    if (!isConnected) {
        return (
            <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/20 relative z-10">
                <CardHeader className="text-center">
                     <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                        <UserPlus className="h-8 w-8 text-primary"/>
                    </div>
                    <CardTitle className="text-2xl font-headline text-white">Create Your Account</CardTitle>
                    <CardDescription className="text-foreground/80">
                        Connect your BEP-20 wallet to join the EGLIFE ecosystem.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => connect({ connector: injected() })} className="w-full" size="lg">
                        <Wallet className="mr-2 h-5 w-5" />
                        Connect Wallet
                    </Button>
                     <div className="mt-4 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/dapp" className="underline text-accent">
                            Go to DApp
                        </Link>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/20 relative z-10">
            <CardHeader className="text-center">
                 <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                    <UserPlus className="h-8 w-8 text-primary"/>
                </div>
                <CardTitle className="text-2xl font-headline text-white">Complete Registration</CardTitle>
                <CardDescription className="text-foreground/80">
                    Your wallet is connected. Confirm your sponsor to finish.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-muted border text-center">
                        <Label className="text-muted-foreground">Your Connected Wallet</Label>
                        <p className="font-mono text-sm truncate mt-1">{address}</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sponsor-address" className="text-muted-foreground">Sponsor's Wallet Address</Label>
                        <Input 
                            id="sponsor-address" 
                            placeholder="0x..." 
                            value={sponsorAddress}
                            readOnly
                            className="cursor-not-allowed bg-muted/50 font-mono"
                        />
                         <Alert variant="default" className="mt-2 bg-muted/50 border-muted-foreground/20">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            <AlertDescription className="text-muted-foreground">
                                A sponsor is required. This is pre-filled from a referral link or with the system's default sponsor.
                            </AlertDescription>
                        </Alert>
                    </div>
                    <Button onClick={handleRegister} className="w-full" size="lg" disabled={isRegistering}>
                        {isRegistering ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Registering...
                            </>
                        ) : (
                            "Complete Registration"
                        )}
                    </Button>
                     <Button onClick={() => disconnect()} variant="outline" className="w-full" disabled={isRegistering}>
                        <Link2Off className="mr-2 h-4 w-4" />
                        Disconnect Wallet
                    </Button>
                </div>
                 <div className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/dapp" className="underline text-accent">
                        Go to DApp
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default function RegisterPage() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="relative flex h-screen items-center justify-center bg-background">
                <Image src="/background.png" alt="Background" fill className="object-cover opacity-20" />
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    return (
        <div className="relative flex items-center justify-center min-h-screen p-4 bg-background">
            <Image src="/background.png" alt="Background" fill className="object-cover opacity-20" />
            <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-primary" />}>
                <RegisterForm />
            </Suspense>
        </div>
    );
}

    

    