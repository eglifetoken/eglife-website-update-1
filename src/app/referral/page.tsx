
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Gift, Users, BarChart2, Loader2, ArrowLeft, ArrowRight, Share2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const referralTiers = [
    { level: 1, bonus: "10%" },
    { level: 2, bonus: "5%" },
    { level: 3, bonus: "3%" },
    { level: 4, bonus: "2%" },
    { level: 5, bonus: "1%" },
    { level: 6, bonus: "1%" },
    { level: 7, bonus: "0.5%" },
    { level: 8, bonus: "0.5%" },
    { level: 9, bonus: "0.25%" },
    { level: 10, bonus: "0.25%" },
];

const referralHistory: any[] = [
    // Data will be populated once the system is live and connected to an indexer.
];


export default function ReferralPage() {
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const [referralLink, setReferralLink] = useState("");

    useEffect(() => {
        setIsClient(true);
        if (isConnected && address) {
            // Ensure the link is generated correctly with the connected address.
            const link = `${window.location.origin}/staking?ref=${address}`;
            setReferralLink(link);
        } else {
            // Provide a non-functional link if wallet is not connected.
            setReferralLink(`${window.location.origin}/staking`);
        }
    }, [isConnected, address]);

    const handleCopy = () => {
        if(!isConnected || !address) {
             toast({
                variant: "destructive",
                title: "Wallet Not Connected",
                description: "Please connect your wallet to get your referral link.",
            });
            return;
        };
        navigator.clipboard.writeText(referralLink);
        toast({
            title: "Copied!",
            description: "Your referral link has been copied to the clipboard.",
        });
    };
    
    if (!isClient) {
        return (
            <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Referral Program</h1>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                    Share the EGLIFE experience and earn rewards for every new user who joins and stakes through your link.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Platform Referrals</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">Live data coming soon</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Referral Bonuses Paid</CardTitle>
                        <Gift className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-- EGLIFE</div>
                        <p className="text-xs text-muted-foreground">Live data coming soon</p>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-1 bg-primary/10 border-primary text-center flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl flex items-center justify-center gap-2">
                            <Share2 className="h-5 w-5"/>
                            Your Referral Link
                        </CardTitle>
                         <CardDescription>{isConnected ? "Share this link to earn bonuses." : "Connect your wallet to get your link."}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Input value={referralLink} readOnly className="font-mono text-center text-xs" />
                            <Button variant="outline" size="icon" onClick={handleCopy} disabled={!isConnected || !address}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

             <Alert className="mb-8 border-accent">
                <Info className="h-4 w-4 text-accent"/>
                <AlertTitle className="font-headline">How Referral Bonuses Work</AlertTitle>
                <AlertDescription>
                    Referral bonuses are paid out **instantly and automatically** to your wallet. When a user you referred stakes their EGLIFE tokens, the smart contract immediately sends the bonus directly to you. There is no need to claim them manually.
                </AlertDescription>
            </Alert>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                           <BarChart2 className="h-6 w-6 text-primary" />
                           Referral Bonus Structure
                        </CardTitle>
                        <CardDescription>Earn a percentage of the amount your referred users stake, down to 10 levels.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Level</TableHead>
                                    <TableHead className="text-right">Bonus Percentage</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {referralTiers.map((tier) => (
                                    <TableRow key={tier.level}>
                                        <TableCell className="font-medium">Level {tier.level}</TableCell>
                                        <TableCell className="text-right font-semibold text-primary">{tier.bonus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <p className="text-sm text-muted-foreground mt-4 text-center">A royalty of 0.1% is paid for referrals beyond 10 levels.</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Your Referral History</CardTitle>
                        <CardDescription>Track the activity and earnings from your referrals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Stake</TableHead>
                                    <TableHead className="text-right">Bonus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                 {referralHistory.length > 0 ? referralHistory.map((ref, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="font-medium truncate">{ref.referredUser}</div>
                                            <div className="text-xs text-muted-foreground">{ref.date}</div>
                                        </TableCell>
                                        <TableCell>{ref.stakedAmount}</TableCell>
                                        <TableCell className="text-right font-semibold text-green-500">+{ref.bonus}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            Referral history data is not yet available.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                         <Button variant="outline" className="w-full mt-4" disabled>Load More</Button>
                    </CardContent>
                </Card>
            </div>

            
            <section className="w-full mt-16 pt-8 border-t">
                <div className="container mx-auto px-4 md:px-6 flex justify-between">
                    <Button asChild variant="outline" onClick={() => router.back()}>
                        <Link href="#">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous Page
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/crypto-education">
                            Next Page <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
            
        </div>
    );
}
