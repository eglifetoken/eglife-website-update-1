
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
import { useAccount, useWatchContractEvent } from "wagmi";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { formatEther } from "viem";

const EGLIFE_STAKING_CONTRACT = '0xC1921f78609Bd6C683940E3d43455b41ecE28e11'; 
const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"newPenaltyBps","type":"uint16"}],"name":"EarlyUnstakePenaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newLockPeriod","type":"uint256"}],"name":"LockPeriodUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"maxPayoutBps","type":"uint16"}],"name":"MaxReferralPayoutUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStake","type":"uint256"}],"name":"MinActiveStakeForReferralUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusAmount","type":"uint256"}],"name":"ReferralBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"ReferralBonusesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"royaltyBps","type":"uint16"}],"name":"RoyaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"SponsorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netStaked","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"indexed":false,"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"TiersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"TreasuryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"unstakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"},{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"SponsorUpdated","type":"event"},{"inputs":[],"name":"BPS_DENOMINATOR","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"address[]","name":"newSponsors","type":"address[]"}],"name":"batchUpdateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTierCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTiers","outputs":[{"internalType":"uint128[]","name":"mins","type":"uint128[]"},{"internalType":"uint16[]","name":"apys","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReferralPayoutBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"setReferralBonuses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint16","name":"bps","type":"uint16"}],"name":"setReferralBonusForLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLock","type":"uint256"}],"name":"setLockPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_max","type":"uint16"}],"name":"setMaxReferralPayoutBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_royaltyBps","type":"uint16"}],"name":"setRoyaltyBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"setTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint128","name":"lastClaim","type":"uint128"},{"internalType":"uint128","name":"accRewards","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierApyBps","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierMinAmount","outputs":[{"internalType":"uint128[]","name":"","type":"uint128[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"updateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"}]

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

interface ReferralEvent {
    referrer: string;
    referral: string;
    level: bigint;
    bonusAmount: bigint;
    date: string;
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
    const [recentReferrals, setRecentReferrals] = useState<string[]>([]);

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
        eventName: 'ReferralBonusPaid',
        onLogs(logs) {
            if (!address) return;

            const newBonuses: ReferralEvent[] = [];
            let sessionBonus = 0;

            logs.forEach(log => {
                const { referrer, referral, level, bonusAmount } = log.args as any;
                
                if (referrer && referrer.toLowerCase() === address.toLowerCase()) {
                    const bonus = parseFloat(formatEther(bonusAmount!));
                    
                    const newEntry: ReferralEvent = {
                        referrer: referrer,
                        referral: referral!,
                        level: level!,
                        bonusAmount: bonusAmount!,
                        date: new Date().toLocaleString(),
                    };
                    
                    newBonuses.push(newEntry);
                    sessionBonus += bonus;

                    toast({
                        title: "Referral Bonus Received!",
                        description: `You earned ${bonus.toFixed(4)} EGLIFE from a Level ${level} referral.`,
                    });
                }
            });

            if (newBonuses.length > 0) {
                setReferralHistory(prev => [...newBonuses, ...prev]);
                setTotalBonus(prev => prev + sessionBonus);
            }
        },
    });

    useWatchContractEvent({
        address: EGLIFE_STAKING_CONTRACT,
        abi: stakingContractAbi,
        eventName: 'Staked',
        onLogs(logs) {
            if (!address) return;

            logs.forEach(log => {
                const { user, sponsor } = log.args as any;
                
                if (sponsor && sponsor.toLowerCase() === address.toLowerCase()) {
                    setDirectReferralCount(prev => prev + 1);
                    setRecentReferrals(prev => [user!, ...prev].slice(0, 5)); // Keep last 5
                     toast({
                        title: "New Referral!",
                        description: `A new user has staked using your referral link.`,
                    });
                }
            });
        },
    });


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
                console.error("Error sharing:", error);
                toast({
                    variant: "destructive",
                    title: "Sharing Failed",
                    description: "Could not share the link. Please try copying it instead.",
                });
            }
        } else {
            handleCopy();
            toast({
                title: "Link Copied!",
                description: "Sharing is not supported on this browser. Your referral link has been copied instead.",
            });
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Your Direct Referrals</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{directReferralCount}</div>
                        <p className="text-xs text-muted-foreground">Live count for this session. Full history coming soon.</p>
                        {recentReferrals.length > 0 && (
                            <div className="mt-2 text-left">
                                <p className="text-xs font-semibold">Recent:</p>
                                <ul className="text-xs text-muted-foreground font-mono list-disc list-inside">
                                    {recentReferrals.map((ref, i) => <li key={i} className="truncate" title={ref}>{ref}</li>)}
                                </ul>
                            </div>
                        )}
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
                        <CardDescription>Earn a percentage of the amount your referred users stake, down to 10 levels and beyond.</CardDescription>
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
                                <TableRow className="border-t-2 border-primary/20">
                                    <TableCell className="font-medium">Royalty (Beyond Lvl 10)</TableCell>
                                    <TableCell className="text-right font-semibold text-primary">0.1%</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <p className="text-sm text-muted-foreground mt-4 text-center">Royalty is paid to unlimited depth on your entire referral network.</p>
                    </CardContent>
                </Card>

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
                                    <TableHead>Level</TableHead>
                                    <TableHead className="text-right">Bonus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                 {referralHistory.length > 0 ? referralHistory.map((ref, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="font-medium truncate" title={ref.referral}>{ref.referral.slice(0, 6)}...{ref.referral.slice(-4)}</div>
                                            <div className="text-xs text-muted-foreground">{ref.date}</div>
                                        </TableCell>
                                        <TableCell>Level {ref.level.toString()}</TableCell>
                                        <TableCell className="text-right font-semibold text-green-500">+{parseFloat(formatEther(ref.bonusAmount)).toFixed(4)}</TableCell>
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
