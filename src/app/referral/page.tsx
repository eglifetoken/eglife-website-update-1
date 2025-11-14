
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Gift, Users, Loader2, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount, useWatchContractEvent } from "wagmi";
import { formatEther } from "viem";

const EGLIFE_STAKING_CONTRACT = '0x90B374f87726F172504501c0B91eeEbadB5FE230'; 
const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_defaultAdmin","type":"address"},{"internalType":"address","name":"_rewardsWallet","type":"address"},{"internalType":"address","name":"_referralWallet","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessControlBadConfirmation","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"neededRole","type":"bytes32"}],"name":"AccessControlUnauthorizedAccount","type":"error"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"newLevel","type":"uint8"}],"name":"LevelUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"}],"name":"SponsorUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"level","type":"uint16","name":"aBps","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"bBps","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"cBps","type":"uint16"}],"name":"TeamPercentSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardsWallet","type":"address"},{"indexed":false,"internalType":"address","name":"referralWallet","type":"address"},{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"WalletsUpdated","type":"event"},{"inputs":[],"name":"ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SECONDS_PER_YEAR","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"adminReassignSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"adminRecomputeLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"activated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"directCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"a","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"uint256","name":"limit","type":"uint256"}],"name":"getDirects","outputs":[{"internalType":"address[]","name":"out","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"root","type":"address"},{"internalType":"uint8","name":"depth","type":"uint8"},{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"uint256","name":"limit","type":"uint256"}],"name":"getTeamAtDepth","outputs":[{"internalType":"address[]","name":"out","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"role","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"role","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referee","type":"address"}],"name":"recordPurchaseSponsorBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"role","type":"address"},{"internalType":"address","name":"callerConfirmation","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"role","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsorOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}];

interface ReferralEvent {
    referee: string;
    sponsor: string;
    amount: bigint;
    reason: string;
    date: string;
}

type SponsorBonusPaidLog = {
    eventName: 'SponsorBonusPaid',
    args: {
        referee?: `0x${string}`;
        sponsor?: `0x${string}`;
        amount?: bigint;
        reason?: string;
    }
}

export default function ReferralPage() {
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const [referralLink, setReferralLink] = useState("");
    
    // Live data states
    const [referralHistory, setReferralHistory] = useState<ReferralEvent[]>([]);
    const [totalBonus, setTotalBonus] = useState(0);
    const [directReferralCount, setDirectReferralCount] = useState(0);

    useEffect(() => {
        setIsClient(true);
        if (isConnected && address) {
            const link = `${window.location.origin}/register?ref=${address}`;
            setReferralLink(link);
        } else {
            setReferralLink(`${window.location.origin}/register`);
        }
    }, [isConnected, address]);

    useWatchContractEvent({
        address: EGLIFE_STAKING_CONTRACT,
        abi: stakingContractAbi,
        eventName: 'SponsorBonusPaid',
        onLogs(logs: readonly SponsorBonusPaidLog[]) {
            if (!address) return;

            const myNewBonuses: ReferralEvent[] = [];
            let sessionBonus = 0;
            let newReferrals = 0;

            logs.forEach(log => {
                const { referee, sponsor, amount, reason } = log.args;
                
                if (sponsor && amount && sponsor.toLowerCase() === address.toLowerCase()) {
                    const bonus = parseFloat(formatEther(amount));
                    
                    const newEntry: ReferralEvent = {
                        referee: referee || '0x',
                        sponsor: sponsor,
                        amount: amount,
                        reason: reason || 'UNKNOWN',
                        date: new Date().toLocaleString(),
                    };
                    
                    myNewBonuses.push(newEntry);
                    sessionBonus += bonus;
                    newReferrals++;

                    toast({
                        title: "Referral Bonus Received!",
                        description: `You earned ${bonus.toFixed(4)} EGLIFE from a new referral.`,
                    });
                }
            });

            if (myNewBonuses.length > 0) {
                setReferralHistory(prev => [...myNewBonuses, ...prev]);
                setTotalBonus(prev => prev + sessionBonus);
                setDirectReferralCount(prev => prev + newReferrals);
            }
        },
    });


    const handleCopy = async () => {
        if (!isConnected || !address) {
            toast({
                variant: "destructive",
                title: "Wallet Not Connected",
                description: "Please connect your wallet to get your referral link.",
            });
            return;
        }

        if (!navigator.clipboard) {
            toast({
                variant: "destructive",
                title: "Copy Not Supported",
                description: "Your browser does not support the Clipboard API. Please copy the link manually.",
            });
            return;
        }

        try {
            await navigator.clipboard.writeText(referralLink);
            toast({
                title: "Copied!",
                description: "Your referral link has been copied to the clipboard.",
            });
        } catch (err) {
            console.error("Failed to copy: ", err);
            toast({
                variant: "destructive",
                title: "Copy Failed",
                description: "Could not copy the link. Please try again or copy it manually.",
            });
        }
    };

    const handleShare = async () => {
        if (!isConnected || !address) {
            toast({
                variant: "destructive",
                title: "Wallet Not Connected",
                description: "Please connect your wallet to get your referral link.",
            });
            return;
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join EGLIFE!',
                    text: 'Join me on EGLIFE and earn crypto rewards. Use my link to register:',
                    url: referralLink,
                });
                toast({
                    title: "Link Shared!",
                    description: "Thank you for sharing!",
                });
            } catch (error) {
                // If user cancels share, do nothing.
                console.log("Share cancelled or failed:", error);
            }
        } else {
            // If share is not supported, fall back to copying the link.
            handleCopy();
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
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Referral Program</h1>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                    Share the EGLIFE experience and earn rewards for every new user who joins and stakes through your link.
                </p>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
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
                             <Button variant="outline" size="icon" onClick={handleShare} disabled={!isConnected || !address}>
                                <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={handleCopy} disabled={!isConnected || !address}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                           <Gift className="h-6 w-6 text-primary" />
                           One-Time Referral Bonus
                        </CardTitle>
                        <CardDescription>Earn an instant, one-time bonus when a new user you directly sponsor stakes 50 EGLIFE or more.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg border bg-muted/50 text-center">
                            <p className="text-sm text-muted-foreground">On Successful Staking of 50 EGLIFE or more</p>
                            <p className="text-2xl font-bold">10 EGLIFE</p>
                        </div>
                    </CardContent>
                </Card>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Your Direct Referrals</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{directReferralCount}</div>
                        <p className="text-xs text-muted-foreground">Live count for this session. Full history coming soon.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Your Bonus Earnings</CardTitle>
                        <Gift className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBonus.toFixed(4)} EGLIFE</div>
                        <p className="text-xs text-muted-foreground">Live data from this session</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Referral History</CardTitle>
                    <CardDescription>A live feed of your referral bonuses from this session.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Referred User</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Bonus</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                                {referralHistory.length > 0 ? referralHistory.map((ref, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="font-medium truncate" title={ref.referee}>{ref.referee.slice(0, 6)}...{ref.referee.slice(-4)}</div>
                                        <div className="text-xs text-muted-foreground">{ref.date}</div>
                                    </TableCell>
                                    <TableCell>{ref.reason}</TableCell>
                                    <TableCell className="text-right font-semibold text-green-500">+{parseFloat(formatEther(ref.amount)).toFixed(2)}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        Listening for new referral bonuses...
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                        <p className="text-xs text-muted-foreground mt-4 text-center">Full historical data is not yet available. This feed shows live data for your current session only and will reset on refresh.</p>
                </CardContent>
            </Card>

            
            {isClient &&
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
            }
            
        </div>
    );
}
