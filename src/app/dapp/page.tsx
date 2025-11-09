
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, Wallet, Link as LinkIcon, Link2Off, IndianRupee, Loader2, Copy, Users, UserCheck, BarChart, TrendingUp, Landmark, Repeat, DollarSign, PiggyBank, Gift, User as UserIcon, Calendar, PieChart, HandCoins, Info, HelpCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useAccount, useConnect, useDisconnect, useBalance, useReadContract, useChainId, useWriteContract, useSwitchChain } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { formatEther, parseEther, zeroAddress, type BaseError } from "viem";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { bsc } from "wagmi/chains";
import Image from "next/image";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const EGLIFE_STAKING_CONTRACT = "0xb80F123d2E5200F1Cb6dEfd428f5aDa543C94E76"; 
const PANCAKESWAP_SWAP_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;


const tokenContractAbi = [{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"newPenaltyBps","type":"uint16"}],"name":"EarlyUnstakePenaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newLockPeriod","type":"uint256"}],"name":"LockPeriodUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"maxPayoutBps","type":"uint16"}],"name":"MaxReferralPayoutUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStake","type":"uint256"}],"name":"MinActiveStakeForReferralUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusAmount","type":"uint256"}],"name":"ReferralBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"ReferralBonusesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"royaltyBps","type":"uint16"}],"name":"RoyaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"SponsorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netStaked","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"indexed":false,"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"TiersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"TreasuryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"unstakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"},{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"SponsorUpdated","type":"event"},{"inputs":[],"name":"BPS_DENOMINATOR","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"address[]","name":"newSponsors","type":"address[]"}],"name":"batchUpdateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTierCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTiers","outputs":[{"internalType":"uint128[]","name":"mins","type":"uint128[]"},{"internalType":"uint16[]","name":"apys","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReferralPayoutBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"setReferralBonuses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint16","name":"bps","type":"uint16"}],"name":"setReferralBonusForLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLock","type":"uint256"}],"name":"setLockPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_max","type":"uint16"}],"name":"setMaxReferralPayoutBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_royaltyBps","type":"uint16"}],"name":"setRoyaltyBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"setTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint128","name":"lastClaim","type":"uint128"},{"internalType":"uint128","name":"accRewards","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierApyBps","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierMinAmount","outputs":[{"internalType":"uint128[]","name":"","type":"uint128[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"updateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const todayIncome = [
  { icon: PiggyBank, title: "Today Staking Income", value: "0.00" },
  { icon: Gift, title: "Today Referral Income", value: "0.00" },
  { icon: BarChart, title: "Today Level Income", value: "0.00" },
  { icon: Users, title: "Today Team Income", value: "0.00" },
  { icon: HandCoins, title: "Today EGPAY Rewards", value: "0.00" },
];

const totalIncome = [
  { icon: TrendingUp, title: "Total Staking Income", value: "0.00" },
  { icon: Gift, title: "Total Referral Income", value: "0.00" },
  { icon: PieChart, title: "Total Level Income", value: "0.00" },
  { icon: Users, title: "Total Team Income", value: "0.00" },
  { icon: HandCoins, title: "Total EGPAY Rewards", value: "0.00" },
];

const levelWiseTeamDetails = [
  { level: "LV 1", count: 0 },
  { level: "LV 2", count: 0 },
  { level: "LV 3", count: 0 },
  { level: "LV 4", count: 0 },
  { level: "LV 5", count: 0 },
  { level: "LV 6", count: 0 },
];

const groupWiseTeamDetails = [
  { icon: Users, title: "Total Team", count: 0 },
  { icon: UserCheck, title: "Group A (Directs)", count: 0 },
  { icon: Users, title: "Group B", count: 0 },
  { icon: Users, title: "Group C", count: 0 },
]

function DappPageContent() {
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const isWrongNetwork = isConnected && chainId !== bsc.id;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const { data: egldBalance, isLoading: isLoadingEgld, refetch: refetchEgldBalance } = useBalance({ address, token: EGLIFE_CONTRACT_ADDRESS, query: { enabled: !isWrongNetwork && !!address } });
  const { data: bnbBalance, isLoading: isLoadingBnb } = useBalance({ address, query: { enabled: !isWrongNetwork && !!address } });
  
  const { data: stakedData, isLoading: isLoadingStaked, refetch: refetchStakedBalance } = useReadContract({ abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'stakedOf', args: address ? [address] : undefined, query: { enabled: !isWrongNetwork && !!address } });
  const { data: earnedData, isLoading: isLoadingEarned, refetch: refetchEarned } = useReadContract({ abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'earned', args: address ? [address] : undefined, query: { enabled: !isWrongNetwork && !!address, refetchInterval: 5000 } });
  const { data: sponsorData, isLoading: isLoadingSponsor } = useReadContract({ abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'sponsors', args: address ? [address] : undefined, query: { enabled: !isWrongNetwork && !!address }});
  const { data: allowance, refetch: refetchAllowance } = useReadContract({ abi: tokenContractAbi, address: EGLIFE_CONTRACT_ADDRESS, functionName: 'allowance', args: address ? [address, EGLIFE_STAKING_CONTRACT] : undefined, query: { enabled: !!address && !isWrongNetwork } });
  
  const referralLink = isClient ? `${window.location.origin}/register?ref=${address}` : "";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(referralLink);
        toast({ title: "Copied!", description: "Your referral link has been copied." });
    } catch (err) {
        toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy the link." });
    }
  };

  const handleError = (error: any, title: string) => {
    let message = "An unknown error occurred.";
    if (typeof error === 'object' && error !== null) {
        if ('shortMessage' in error) message = (error as BaseError).shortMessage;
        else if ('message' in error) message = error.message;
    }
    toast({ variant: "destructive", title: title, description: message });
  }

  const handleStakeAction = async () => {
     if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      handleError(new Error("Please enter a valid amount to stake."), "Invalid Amount");
      return;
    }
    setIsProcessing(true);
    const parsedStakeAmount = parseEther(stakeAmount);
    const needsApproval = allowance !== undefined && parsedStakeAmount > 0 && allowance < parsedStakeAmount;

    try {
        if (needsApproval) {
            toast({ title: "Approval Required", description: "Please approve the token spending in your wallet." });
            await writeContractAsync({ address: EGLIFE_CONTRACT_ADDRESS, abi: tokenContractAbi, functionName: 'approve', args: [EGLIFE_STAKING_CONTRACT, parsedStakeAmount] });
            toast({ title: "Approval Successful!", description: "You can now proceed to stake." });
            await refetchAllowance();
        }
        
        toast({ title: "Staking Initialized", description: "Please confirm the staking transaction in your wallet." });
        const onChainSponsor = sponsorData && sponsorData !== zeroAddress ? sponsorData : null;
        const urlSponsor = searchParams.get("ref");
        const defaultSponsor = "0xf2f000C78519015B91220c7bE3EF26241bEc686f";
        const referrerAddress = onChainSponsor || urlSponsor || defaultSponsor;

        await writeContractAsync({ address: EGLIFE_STAKING_CONTRACT, abi: stakingContractAbi, functionName: 'stake', args: [parsedStakeAmount, referrerAddress as `0x${string}`] });
        toast({ title: "Staking Successful!", description: `You have successfully staked ${stakeAmount} EGLIFE.` });
        refetchEgldBalance();
        refetchStakedBalance();
        setStakeAmount("");
    } catch (error) {
        handleError(error, "Staking Process Failed");
    } finally {
        setIsProcessing(false);
    }
  }

 const handleUnstake = async (isUnstakeAll = false) => {
    const totalStaked = stakedData ? parseFloat(formatEther(stakedData)) : 0;
    const amountToUnstake = isUnstakeAll ? totalStaked : (unstakeAmount ? parseFloat(unstakeAmount) : 0);
    
    if (amountToUnstake <= 0) {
        toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter a valid amount to unstake." });
        return;
    }
    if (!isUnstakeAll && amountToUnstake > totalStaked) {
        toast({ variant: "destructive", title: "Invalid Amount", description: "You cannot unstake more than you have staked." });
        return;
    }
    const unstakeAmountBigInt = isUnstakeAll ? (stakedData ?? 0n) : parseEther(amountToUnstake.toString());

    setIsProcessing(true);
    try {
        await writeContractAsync({ address: EGLIFE_STAKING_CONTRACT, abi: stakingContractAbi, functionName: 'unstake', args: [unstakeAmountBigInt] });
        toast({ title: "Unstaking Successful!", description: `Your transaction to unstake ${amountToUnstake.toFixed(2)} EGLIFE has been submitted.` });
        refetchEgldBalance();
        refetchStakedBalance();
        refetchEarned();
        setUnstakeAmount("");
    } catch(error) {
        handleError(error, "Unstaking Failed");
    } finally {
        setIsProcessing(false);
    }
}

  const handleClaim = async () => {
       setIsClaiming(true);
       try {
        await writeContractAsync({ address: EGLIFE_STAKING_CONTRACT, abi: stakingContractAbi, functionName: 'claim', args: [] });
        toast({ title: "Claim Successful!", description: `Your rewards have been sent to your wallet.` });
        refetchEarned();
        refetchEgldBalance();
       } catch (error) {
           handleError(error, "Claim Failed");
       } finally {
           setIsClaiming(false);
       }
  }

  if (!isClient) {
    return <div className="relative flex h-screen items-center justify-center bg-background">
        <Image src="/background.png" alt="Background" fill className="object-cover opacity-20" />
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>;
  }

  if (!isConnected) {
    return (
        <div className="relative flex h-screen items-center justify-center bg-background p-4">
            <Image src="/background.png" alt="Background" fill className="object-cover opacity-20" />
             <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-primary/20 relative z-10">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                        <Wallet className="h-8 w-8 text-primary"/>
                    </div>
                    <CardTitle className="text-2xl font-headline text-white">Secure Wallet Access</CardTitle>
                    <CardDescription className="text-foreground/80">Connect your BEP-20 wallet to access the EGLIFE DApp dashboard.</CardDescription>
                </CardHeader>
                <CardContent><Button onClick={() => connect({ connector: injected() })} className="w-full" size="lg"><Wallet className="mr-2 h-5 w-5" />Connect Wallet</Button></CardContent>
            </Card>
        </div>
    )
  }
  
  const isPending = isProcessing || isClaiming;
  const parsedStakeAmount = stakeAmount ? parseEther(stakeAmount) : 0n;
  const needsApproval = allowance !== undefined && parsedStakeAmount > 0 && allowance < parsedStakeAmount;
  const buttonText = isProcessing ? "Processing..." : needsApproval ? "Approve & Stake" : "Stake Now";
  const totalStakedNum = stakedData ? parseFloat(formatEther(stakedData)) : 0;
  const availableToClaimNum = earnedData ? parseFloat(formatEther(earnedData)) : 0;

  return (
    <div className="min-h-screen bg-background text-white p-4 space-y-6">
        <header className="flex justify-between items-center">
            <div/>
            <Button onClick={() => disconnect()} variant="ghost" className="text-white hover:bg-white/10">
                <Link2Off className="mr-2"/>
                Logout
            </Button>
        </header>

        <main className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">User ID:</p><p className="text-xs font-mono break-all">{address}</p>
                        <p className="text-sm text-muted-foreground mt-1">Sponsor ID:</p><p className="text-xs font-mono break-all">{sponsorData && sponsorData !== zeroAddress ? sponsorData : 'N/A'}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center"><CardHeader><CardTitle className="text-sm font-normal text-muted-foreground">EGLIFE Balance</CardTitle></CardHeader><CardContent><p className="font-bold text-lg">{isLoadingEgld || isWrongNetwork ? <Loader2 className="h-5 w-5 mx-auto animate-spin"/> : `${parseFloat(egldBalance?.formatted ?? '0').toFixed(2)}`}</p></CardContent></Card>
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center"><CardHeader><CardTitle className="text-sm font-normal text-muted-foreground">BNB Balance</CardTitle></CardHeader><CardContent><p className="font-bold text-lg">{isLoadingBnb || isWrongNetwork ? <Loader2 className="h-5 w-5 mx-auto animate-spin"/> : `${parseFloat(bnbBalance?.formatted ?? '0').toFixed(4)}`}</p></CardContent></Card>
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-center"><CardHeader><CardTitle className="text-sm font-normal text-muted-foreground">Total Staked</CardTitle></CardHeader><CardContent><p className="font-bold text-lg">{isLoadingStaked || isWrongNetwork ? <Loader2 className="h-5 w-5 mx-auto animate-spin"/> : `${totalStakedNum.toFixed(2)}`}</p></CardContent></Card>
            </div>
            
            {isWrongNetwork && <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Wrong Network</AlertTitle><AlertDescription>Please switch to the BNB Smart Chain to use all features. <Button onClick={() => switchChain({ chainId: bsc.id })} variant="link" className="p-0 h-auto text-white">Switch to BSC</Button></AlertDescription></Alert>}

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader><CardTitle className="text-sm font-normal text-muted-foreground text-center">Available to Claim</CardTitle></CardHeader>
              <CardContent className="text-center"><p className="font-bold text-4xl">{isLoadingEarned || isWrongNetwork ? <Loader2 className="h-8 w-8 mx-auto animate-spin"/> : `${availableToClaimNum.toFixed(4)}`}</p></CardContent>
              <CardFooter><Button className="w-full" onClick={handleClaim} disabled={isPending || isWrongNetwork || availableToClaimNum <= 0}>{isClaiming ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Claiming...</> : 'Claim Now'}</Button></CardFooter>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 border-destructive">
              <CardHeader className="flex-row items-center gap-4">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                  <div>
                      <CardTitle className="font-headline text-xl text-destructive">Security Warning & Approval Check</CardTitle>
                      <CardDescription>If your wallet is performing unauthorized actions, check your approvals immediately.</CardDescription>
                  </div>
              </CardHeader>
              <CardContent>
                  <p className="text-destructive/90 mb-4 text-sm">
                      If tokens are being transferred or swapped from your wallet without your permission, it's possible you've accidentally approved a malicious smart contract. Use a trusted tool like the BscScan "Token Approval Checker" to review and revoke any suspicious approvals for your EGLIFE or other tokens.
                  </p>
              </CardContent>
              <CardFooter>
                  <Button asChild variant="destructive" className="w-full">
                      <a href={`https://bscscan.com/tokenapprovalchecker?search=${address || ''}`} target="_blank" rel="noopener noreferrer">
                          <ShieldCheck className="mr-2 h-5 w-5" />
                          Check Approvals on BscScan
                      </a>
                  </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <Tabs defaultValue="stake" className="w-full">
                <CardHeader><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="stake">Stake</TabsTrigger><TabsTrigger value="unstake">Unstake</TabsTrigger></TabsList></CardHeader>
                <TabsContent value="stake">
                    <CardContent className="space-y-4">
                        <div className="space-y-2"><Label htmlFor="stake-amount">Amount to Stake</Label><Input id="stake-amount" type="number" placeholder="Enter EGLIFE amount" disabled={isPending || isWrongNetwork} value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} /></div>
                        <Alert><Info className="h-4 w-4" /><AlertTitle>{needsApproval ? "Approval Required" : "Ready to Stake"}</AlertTitle><AlertDescription>{needsApproval ? "To stake, you must first grant permission by clicking 'Approve & Stake'. This is a required security step." : "You can stake your tokens directly. The contract already has permission."}</AlertDescription></Alert>
                    </CardContent>
                    <CardFooter><Button className="w-full" disabled={isPending || isWrongNetwork || !stakeAmount} onClick={handleStakeAction}>{isProcessing && !isClaiming ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Processing...</> : buttonText}</Button></CardFooter>
                </TabsContent>
                <TabsContent value="unstake">
                    <CardContent className="space-y-4">
                        <div className="space-y-2"><Label htmlFor="unstake-amount">Amount to Unstake</Label><Input id="unstake-amount" type="number" placeholder={`Max: ${totalStakedNum.toFixed(2)}`} disabled={isPending || totalStakedNum <= 0 || isWrongNetwork} value={unstakeAmount} onChange={(e) => setUnstakeAmount(e.target.value)} /></div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button className="w-full" variant="destructive" disabled={isPending || totalStakedNum <= 0 || !unstakeAmount || isWrongNetwork} onClick={() => handleUnstake(false)}>{isProcessing && !isClaiming ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Unstaking...</> : "Unstake Amount"}</Button>
                        <Button className="w-full" variant="outline" disabled={isPending || totalStakedNum <= 0 || isWrongNetwork} onClick={() => handleUnstake(true)}>{isProcessing && !isClaiming ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Unstaking...</> : "Unstake All"}</Button>
                    </CardFooter>
                </TabsContent>
                </Tabs>
            </Card>

            <Button asChild size="lg" variant="secondary" className="w-full bg-gradient-to-tr from-muted to-card"><Link href={PANCAKESWAP_SWAP_URL} target="_blank"><Repeat className="mr-2"/> Swap on PancakeSwap</Link></Button>

             <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardContent className="p-2"><div className="flex items-center"><Input readOnly value={referralLink} className="bg-transparent border-none text-xs font-mono !ring-0 !ring-offset-0"/><Button onClick={handleCopy} size="sm" className="shrink-0"><Copy className="mr-2"/> Copy</Button></div></CardContent>
            </Card>

             <div className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardHeader><CardTitle className="font-headline text-lg flex items-center gap-2"><Calendar className="h-5 w-5"/>Today's Income</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        {todayIncome.map((stream, index) => { const Icon = stream.icon; return (<div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"><div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-md"><Icon className="h-5 w-5 text-primary"/></div><p className="font-semibold text-sm">{stream.title}</p></div><p className="font-mono text-sm">{stream.value}</p></div>)})}
                    </CardContent>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardHeader><CardTitle className="font-headline text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5"/>Total Income</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        {totalIncome.map((stream, index) => { const Icon = stream.icon; return (<div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"><div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-md"><Icon className="h-5 w-5 text-primary"/></div><p className="font-semibold text-sm">{stream.title}</p></div><p className="font-mono text-sm">{stream.value}</p></div>)})}
                    </CardContent>
                </Card>
            </div>

             <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader><CardTitle className="font-headline text-lg">Total Team Level Wise</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {levelWiseTeamDetails.map((detail, index) => (<div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"><p className="font-medium text-sm">{detail.level}</p><p className="font-bold text-lg">{detail.count}</p></div>))}
                </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader><CardTitle className="font-headline text-lg">Total Team Group Wise</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    {groupWiseTeamDetails.map((detail, index) => { const Icon = detail.icon; return (<div key={index} className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg text-center"><Icon className="h-6 w-6 text-primary mb-2" /><p className="font-medium text-sm text-muted-foreground">{detail.title}</p><p className="font-bold text-2xl">{detail.count}</p></div>)})}
                </CardContent>
            </Card>
        </main>
    </div>
  );
}

export default function DappPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center bg-background"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <DappPageContent />
        </Suspense>
    )
}

    