
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Wallet, Link as LinkIcon, Link2Off, IndianRupee, Loader2, Copy, Users, UserCheck, BarChart, TrendingUp, Landmark, Repeat, DollarSign } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useBalance, useReadContract, useChainId } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { formatUnits, zeroAddress } from "viem";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { bsc } from "wagmi/chains";
import Image from "next/image";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const EGLIFE_STAKING_CONTRACT = "0xb80F123d2E5200F1Cb6dEfd428f5aDa543C94E76"; 
const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
const PANCAKESWAP_SWAP_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;

const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"newPenaltyBps","type":"uint16"}],"name":"EarlyUnstakePenaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newLockPeriod","type":"uint256"}],"name":"LockPeriodUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"maxPayoutBps","type":"uint16"}],"name":"MaxReferralPayoutUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStake","type":"uint256"}],"name":"MinActiveStakeForReferralUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusAmount","type":"uint256"}],"name":"ReferralBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"ReferralBonusesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"royaltyBps","type":"uint16"}],"name":"RoyaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"SponsorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netStaked","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"indexed":false,"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"TiersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"TreasuryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"unstakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"},{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"SponsorUpdated","type":"event"},{"inputs":[],"name":"BPS_DENOMINATOR","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"address[]","name":"newSponsors","type":"address[]"}],"name":"batchUpdateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTierCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTiers","outputs":[{"internalType":"uint128[]","name":"mins","type":"uint128[]"},{"internalType":"uint16[]","name":"apys","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReferralPayoutBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"setReferralBonuses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint16","name":"bps","type":"uint16"}],"name":"setReferralBonusForLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLock","type":"uint256"}],"name":"setLockPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_max","type":"uint16"}],"name":"setMaxReferralPayoutBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_royaltyBps","type":"uint16"}],"name":"setRoyaltyBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"setTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"principal","type":"uint128","name":"lastClaim","type":"uint128","name":"accRewards","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierApyBps","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierMinAmount","outputs":[{"internalType":"uint128[]","name":"","type":"uint128[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"updateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const incomeStreams = [
  { icon: DollarSign, title: "Direct Income", value: "$2.85000", hint: "dollar sign" },
  { icon: TrendingUp, title: "Current Direct Income", value: "$0.00000", hint: "trending up" },
  { icon: BarChart, title: "Level Income", value: "$231.07800", hint: "bar chart" },
  { icon: TrendingUp, title: "Daily Income", value: "$458.39786", hint: "trending up" },
  { icon: Landmark, title: "Monthly Royalty", value: "$0.00000", hint: "landmark" },
  { icon: DollarSign, title: "Total Income", value: "$1,440.52007", hint: "dollar sign" },
  { icon: Users, title: "Package Income", value: "$233.928", hint: "people" },
  { icon: UserCheck, title: "Direct Business", value: "$28", hint: "user check" },
  { icon: Users, title: "Team Business", value: "$21245", hint: "people" },
];

export default function DappPage() {
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId();
  const isBsc = chainId === bsc.id;
  const router = useRouter();

  const { data: egldBalance, isLoading: isLoadingEgld } = useBalance({ address, token: EGLIFE_CONTRACT_ADDRESS as `0x${string}`, query: { enabled: isBsc && !!address } });
  const { data: bnbBalance, isLoading: isLoadingBnb } = useBalance({ address, query: { enabled: isBsc && !!address } });
  const { data: stakedData, isLoading: isLoadingStaked } = useReadContract({ abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'stakedOf', args: address ? [address] : undefined, query: { enabled: isBsc && !!address } });
  const { data: earnedData, isLoading: isLoadingEarned } = useReadContract({ abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'earned', args: address ? [address] : undefined, query: { enabled: isBsc && !!address } });
  const { data: sponsorData, isLoading: isLoadingSponsor } = useReadContract({ abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'sponsors', args: address ? [address] : undefined, query: { enabled: isBsc && !!address }});
  
  const referralLink = isClient ? `${window.location.origin}/register?ref=${address}` : "";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(referralLink);
        toast({
            title: "Copied!",
            description: "Your referral link has been copied.",
        });
    } catch (err) {
        toast({
            variant: "destructive",
            title: "Copy Failed",
            description: "Could not copy the link.",
        });
    }
  };

  if (!isClient) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  if (!isConnected) {
    return (
        <div className="flex h-screen items-center justify-center bg-background p-4">
             <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-2xl text-white">Secure Wallet Access</CardTitle>
                    <CardDescription className="text-foreground/80">Connect your BEP-20 wallet to access the EGLIFE DApp dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => connect({ connector: injected() })} className="w-full" size="lg">
                        <Wallet className="mr-2 h-5 w-5" />
                        Connect Wallet
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white p-4 space-y-6">
        <header className="flex justify-between items-center">
            <div></div>
            <Button onClick={() => disconnect()} variant="ghost" size="icon" className="text-white">
                <Link2Off />
            </Button>
        </header>

        <main className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">User ID:</p>
                        <p className="text-xs font-mono break-all">{address}</p>
                        <p className="text-sm text-muted-foreground mt-1">Sponsor ID:</p>
                        <p className="text-xs font-mono break-all">{sponsorData && sponsorData !== zeroAddress ? sponsorData : 'N/A'}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center">
                    <CardHeader><CardTitle className="text-sm font-normal text-muted-foreground">EGLIFE Balance</CardTitle></CardHeader>
                    <CardContent><p className="font-bold text-lg">{isLoadingEgld ? <Loader2 className="h-5 w-5 mx-auto animate-spin"/> : `${parseFloat(formatUnits(egldBalance?.value ?? 0n, egldBalance?.decimals ?? 18)).toFixed(2)}`}</p></CardContent>
                </Card>
                 <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center">
                    <CardHeader><CardTitle className="text-sm font-normal text-muted-foreground">BNB Balance</CardTitle></CardHeader>
                    <CardContent><p className="font-bold text-lg">{isLoadingBnb ? <Loader2 className="h-5 w-5 mx-auto animate-spin"/> : `${parseFloat(formatUnits(bnbBalance?.value ?? 0n, bnbBalance?.decimals ?? 18)).toFixed(4)}`}</p></CardContent>
                </Card>
                 <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center">
                    <CardHeader><CardTitle className="text-sm font-normal text-muted-foreground">Total Staked</CardTitle></CardHeader>
                    <CardContent><p className="font-bold text-lg">{isLoadingStaked ? <Loader2 className="h-5 w-5 mx-auto animate-spin"/> : `${parseFloat(formatUnits(stakedData ?? 0n, 18)).toFixed(2)}`}</p></CardContent>
                </Card>
                 <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center">
                    <CardHeader><CardTitle className="text-sm font-normal text-muted-foreground">Total Earned</CardTitle></CardHeader>
                    <CardContent><p className="font-bold text-lg">{isLoadingEarned ? <Loader2 className="h-5 w-5 mx-auto animate-spin"/> : `${parseFloat(formatUnits(earnedData ?? 0n, 18)).toFixed(4)}`}</p></CardContent>
                </Card>
            </div>

             <div className="grid grid-cols-2 gap-4">
                <Button asChild size="lg" className="bg-gradient-to-tr from-primary/80 to-primary"><Link href="/staking"><Landmark className="mr-2"/> Go to Staking</Link></Button>
                <Button asChild size="lg" variant="secondary" className="bg-gradient-to-tr from-muted to-card"><Link href={PANCAKESWAP_SWAP_URL} target="_blank"><Repeat className="mr-2"/> Swap on PancakeSwap</Link></Button>
            </div>

             <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardContent className="p-2">
                    <div className="flex items-center">
                        <Input readOnly value={referralLink} className="bg-transparent border-none text-xs font-mono !ring-0 !ring-offset-0"/>
                        <Button onClick={handleCopy} size="sm" className="shrink-0"><Copy className="mr-2"/> Copy</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                 <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center flex flex-col justify-center p-4">
                    <CardTitle className="text-sm font-normal text-muted-foreground mb-1">Total Team</CardTitle>
                    <p className="font-bold text-xl">329</p>
                </Card>
                 <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center flex flex-col justify-center p-4">
                    <CardTitle className="text-sm font-normal text-muted-foreground mb-1">Direct Team</CardTitle>
                    <p className="font-bold text-xl">4</p>
                </Card>
            </div>

             <div className="space-y-2">
                {incomeStreams.map((stream, index) => {
                    const Icon = stream.icon;
                    return (
                         <Card key={index} className="bg-card/80 backdrop-blur-sm border-primary/20">
                            <CardContent className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-md"><Icon className="h-5 w-5 text-primary"/></div>
                                    <p className="font-semibold text-sm">{stream.title}</p>
                                </div>
                                <p className="font-mono text-sm">{stream.value}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

        </main>
    </div>
  );
}

    
