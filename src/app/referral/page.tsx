
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Gift, Users, BarChart2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

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
    // Data will be populated once the system is live
];

const referralCode = "EGLIFE-A4B7X9";

export default function ReferralPage() {
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        toast({
            title: "Copied!",
            description: "Your referral code has been copied to the clipboard.",
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
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">No users have joined via referral yet.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Referral Bonuses Paid</CardTitle>
                        <Gift className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0 EGLIFE</div>
                        <p className="text-xs text-muted-foreground">No referral bonuses paid out yet.</p>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-1 bg-primary/10 border-primary text-center flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Your Referral Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Input value={referralCode} readOnly className="font-mono text-center" />
                            <Button variant="outline" size="icon" onClick={handleCopy}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

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
                                            No referral history yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                         <Button variant="outline" className="w-full mt-4" disabled>Load More</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
