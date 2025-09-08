
"use client";

import { useState, useEffect } from "react";
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

export default function RegisterPage() {
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
        const defaultSponsor = "0xe2eCCd5e1CAe5c6D0B1d9e0d53aeC58b0FE7d31d";
        setSponsorAddress(refFromUrl || defaultSponsor);
    }, [searchParams]);


    const handleRegister = async () => {
        if (!sponsorAddress) {
             toast({
                variant: "destructive",
                title: "Sponsor Required",
                description: "Please enter a valid sponsor wallet address.",
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

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
            <Card className="mx-auto max-w-md w-full">
                <CardHeader className="text-center">
                     <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                        <UserPlus className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline">Create Your Account</CardTitle>
                    <CardDescription>
                        Connect your BEP-20 wallet to join the EGLIFE ecosystem.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!isConnected ? (
                         <Button onClick={() => connect({ connector: injected() })} className="w-full" size="lg">
                            <Wallet className="mr-2 h-5 w-5" />
                            Connect Wallet
                        </Button>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-muted border text-center">
                                <Label>Your Connected Wallet</Label>
                                <p className="font-mono text-sm truncate mt-1">{address}</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sponsor-address">Sponsor's Wallet Address</Label>
                                <Input 
                                    id="sponsor-address" 
                                    placeholder="0x..." 
                                    value={sponsorAddress}
                                    onChange={(e) => setSponsorAddress(e.target.value)}
                                    disabled={isRegistering}
                                />
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
                    )}
                     <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/dapp" className="underline text-accent">
                            Go to DApp
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
