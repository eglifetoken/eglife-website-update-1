
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiggyBank, Landmark, Wallet, HelpCircle, AlertTriangle, Link as LinkIcon, Link2Off, ArrowRight, ArrowLeft, Loader2, Info, RefreshCw, Award, History, LineChart, CheckCircle2, UserCheck, ArrowUp, Users, ShieldCheck } from "lucide-react"
import { StakingFAQ } from "@/components/staking-faq"
import { useAccount, useConnect, useBalance, useWriteContract, useDisconnect, useReadContract, useSwitchChain, useChainId } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useState, useEffect, Suspense } from "react"
import { useToast } from "@/hooks/use-toast"
import { parseEther, formatEther, type BaseError, zeroAddress } from "viem"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { bsc } from "wagmi/chains"
import { RewardsHistoryDialog } from "@/components/rewards-history-dialog"


const EGLIFE_TOKEN_CONTRACT = '0xca326a5e15b9451efC1A6BddaD6fB098a4D09113';
const EGLIFE_STAKING_CONTRACT = '0xb80F123d2E5200F1Cb6dEfd428f5aDa543C94E76'; 

const tokenContractAbi = [{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"newPenaltyBps","type":"uint16"}],"name":"EarlyUnstakePenaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newLockPeriod","type":"uint256"}],"name":"LockPeriodUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"maxPayoutBps","type":"uint16"}],"name":"MaxReferralPayoutUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStake","type":"uint256"}],"name":"MinActiveStakeForReferralUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusAmount","type":"uint256"}],"name":"ReferralBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"ReferralBonusesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"royaltyBps","type":"uint16"}],"name":"RoyaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"SponsorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netStaked","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"indexed":false,"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"TiersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"TreasuryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"unstakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"},{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"SponsorUpdated","type":"event"},{"inputs":[],"name":"BPS_DENOMINATOR","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"address[]","name":"newSponsors","type":"address[]"}],"name":"batchUpdateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTierCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTiers","outputs":[{"internalType":"uint128[]","name":"mins","type":"uint128[]"},{"internalType":"uint16[]","name":"apys","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReferralPayoutBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"setReferralBonuses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint16","name":"bps","type":"uint16"}],"name":"setReferralBonusForLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLock","type":"uint256"}],"name":"setLockPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_max","type":"uint16"}],"name":"setMaxReferralPayoutBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_royaltyBps","type":"uint16"}],"name":"setRoyaltyBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"setTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint128","name":"lastClaim","type":"uint128"},{"internalType":"uint128","name":"accRewards","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierApyBps","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierMinAmount","outputs":[{"internalType":"uint128[]","name":"","type":"uint128[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"updateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const stakingTiers = [
    { level: "LV 1", range: "50 – 499", daily: "0.27%", monthly: "8.33%", yearly: "100%" },
    { level: "LV 2", range: "500 – 1,999", daily: "0.34%", monthly: "10.42%", yearly: "125%" },
    { level: "LV 3", range: "2,000 – 4,999", daily: "0.41%", monthly: "12.50%", yearly: "150%" },
    { level: "LV 4", range: "5,000 – 9,999", daily: "0.48%", monthly: "14.58%", yearly: "175%" },
    { level: "LV 5", range: "10,000 – 29,999", daily: "0.55%", monthly: "16.67%", yearly: "200%" },
    { level: "LV 6", range: "30,000 – 50,000", daily: "0.68%", monthly: "20.83%", yearly: "250%" },
];

const teamIncomeTiers = [
    { level: "LV 2", groupA: "10%", groupB: "2%", groupC: "0.50%" },
    { level: "LV 3", groupA: "12%", groupB: "3%", groupC: "1.00%" },
    { level: "LV 4", groupA: "14%", groupB: "4%", groupC: "1.50%" },
    { level: "LV 5", groupA: "16%", groupB: "5%", groupC: "2.00%" },
    { level: "LV 6", groupA: "18%", groupB: "6%", groupC: "2.50%" },
];

const levelUpgradeRules = [
    { from: "LV0", to: "LV1", selfStaking: "50 – 499", groupA: 0, groupBC: 0, total: 0 },
    { from: "LV1", to: "LV2", selfStaking: "500 – 1,999", groupA: 3, groupBC: 5, total: 8 },
    { from: "LV2", to: "LV3", selfStaking: "2,000 – 4,999", groupA: 6, groupBC: 20, total: 26 },
    { from: "LV3", to: "LV4", selfStaking: "5,000 – 9,999", groupA: 15, groupBC: 35, total: 50 },
    { from: "LV4", to: "LV5", selfStaking: "10,000 – 29,999", groupA: 25, groupBC: 70, total: 95 },
    { from: "LV5", to: "LV6", selfStaking: "30,000 – 50,000", groupA: 35, groupBC: 180, total: 215 },
];

const mockClaimHistory: any[] = [];
const mockDailyRewards: any[] = [];


function StakingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const chainId = useChainId()
  const isWrongNetwork = isConnected && chainId !== bsc.id;
  
  const { data: balance, isLoading: isLoadingBalance, refetch: refetchBalance } = useBalance({
    address,
    token: EGLIFE_TOKEN_CONTRACT,
    query: { enabled: isConnected && !isWrongNetwork }
  })

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: tokenContractAbi,
    address: EGLIFE_TOKEN_CONTRACT,
    functionName: 'allowance',
    args: address ? [address, EGLIFE_STAKING_CONTRACT] : undefined,
    query: { enabled: isConnected && !isWrongNetwork && !!address }
  });

  const { data: stakedData, isLoading: isLoadingStaked, refetch: refetchStakedBalance } = useReadContract({
    abi: stakingContractAbi,
    address: EGLIFE_STAKING_CONTRACT,
    functionName: 'stakedOf',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !isWrongNetwork && !!address }
  });

  const { data: earnedData, isLoading: isLoadingEarned, refetch: refetchEarned } = useReadContract({
    abi: stakingContractAbi,
    address: EGLIFE_STAKING_CONTRACT,
    functionName: 'earned',
    args: address ? [address] : undefined,
     query: {
        enabled: isConnected && !isWrongNetwork && !!address,
        refetchInterval: 5000, // Refetch every 5 seconds
    }
  });
  
  const { data: sponsorData, isLoading: isLoadingSponsor } = useReadContract({
    abi: stakingContractAbi,
    address: EGLIFE_STAKING_CONTRACT,
    functionName: 'sponsors',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !isWrongNetwork && !!address }
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, [])


  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [totalClaimed, setTotalClaimed] = useState(0); 

  const { writeContractAsync } = useWriteContract();

  const totalStaked = stakedData ? parseFloat(formatEther(stakedData as bigint)) : 0.00;
  const availableToClaim = earnedData ? parseFloat(formatEther(earnedData as bigint)) : 0.00;
  const totalEarned = availableToClaim + totalClaimed;
  
  const parsedStakeAmount = stakeAmount ? parseEther(stakeAmount) : 0n;
  const needsApproval = allowance !== undefined && parsedStakeAmount > 0 && allowance < parsedStakeAmount;
  
  const handleError = (error: any, title: string) => {
    let message = "An unknown error occurred.";
    if (typeof error === 'object' && error !== null) {
        if ('shortMessage' in error) {
            message = (error as BaseError).shortMessage;
        } else if ('message' in error) {
            message = error.message;
        }
    }
    toast({
        variant: "destructive",
        title: title,
        description: message,
    });
  }

  const handleApprove = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter a valid amount." });
      return;
    }

    setIsApproving(true);
    try {
        await writeContractAsync({
            address: EGLIFE_TOKEN_CONTRACT,
            abi: tokenContractAbi,
            functionName: 'approve',
            args: [EGLIFE_STAKING_CONTRACT, parseEther(stakeAmount)],
        });
        toast({
            title: "Approval Successful!",
            description: `You have approved the contract to spend ${stakeAmount} EGLIFE. You can now stake your tokens.`,
        });
        refetchAllowance();
    } catch (error) {
        handleError(error, "Approval Failed");
    } finally {
        setIsApproving(false);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      handleError(new Error("Please enter a valid amount to stake."), "Invalid Amount");
      return;
    }

    setIsStaking(true);
    const onChainSponsor = sponsorData && sponsorData !== zeroAddress ? sponsorData : null;
    const urlSponsor = searchParams.get("ref");
    const defaultSponsor = "0xf2f000C78519015B91220c7bE3EF26241bEc686f";
    
    const referrerAddress = onChainSponsor || urlSponsor || defaultSponsor;

    try {
        await writeContractAsync({
            address: EGLIFE_STAKING_CONTRACT,
            abi: stakingContractAbi,
            functionName: 'stake',
            args: [parseEther(stakeAmount), referrerAddress as `0x${string}`],
        });
        toast({
            title: "Staking Successful!",
            description: `You have successfully staked ${stakeAmount} EGLIFE.`,
        });
        refetchBalance();
        refetchStakedBalance();
        setStakeAmount("");
    } catch (error) {
        handleError(error, "Staking Failed");
    } finally {
        setIsStaking(false);
    }
  };

 const handleUnstake = async (isUnstakeAll = false) => {
    const amountToUnstake = isUnstakeAll ? totalStaked : (unstakeAmount ? parseFloat(unstakeAmount) : 0);
    
    if (amountToUnstake <= 0) {
        toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter a valid amount to unstake or have a staked balance > 0." });
        return;
    }
    if (!isUnstakeAll && amountToUnstake > totalStaked) {
        toast({ variant: "destructive", title: "Invalid Amount", description: "You cannot unstake more than you have staked." });
        return;
    }

    const unstakeAmountBigInt = isUnstakeAll ? (stakedData ?? 0n) : parseEther(amountToUnstake.toString());

    if (!unstakeAmountBigInt || unstakeAmountBigInt <= 0n) {
        toast({ variant: "destructive", title: "Invalid Amount", description: "Unstake amount must be greater than zero." });
        return;
    }

    setIsUnstaking(true);
    try {
        await writeContractAsync({
            address: EGLIFE_STAKING_CONTRACT,
            abi: stakingContractAbi,
            functionName: 'unstake',
            args: [unstakeAmountBigInt],
        });
        toast({
            title: "Unstaking Successful!",
            description: `Your transaction to unstake ${amountToUnstake.toFixed(2)} EGLIFE has been submitted.`,
        });
        refetchBalance();
        refetchStakedBalance();
        refetchEarned();
        setUnstakeAmount("");
    } catch(error) {
        handleError(error, "Unstaking Failed");
    } finally {
        setIsUnstaking(false);
    }
}


  const handleClaim = async () => {
       setIsClaiming(true);
       try {
        const claimAmount = availableToClaim;
        await writeContractAsync({
            address: EGLIFE_STAKING_CONTRACT,
            abi: stakingContractAbi,
            functionName: 'claim',
            args: [],
        });
        toast({
            title: "Claim Successful!",
            description: `Your rewards have been sent to your wallet.`,
        });
        // Optimistically update the total claimed amount
        setTotalClaimed(prev => prev + claimAmount);
        refetchEarned();
        refetchBalance();
       } catch (error) {
           handleError(error, "Claim Failed");
       } finally {
           setIsClaiming(false);
       }
  }

  const isPending = isApproving || isStaking || isUnstaking || isClaiming;

  if (!isClient) {
    return (
        <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <>
    <RewardsHistoryDialog 
        isOpen={isHistoryOpen} 
        onOpenChange={setIsHistoryOpen} 
        dailyRewards={mockDailyRewards}
        totalEarned={totalEarned}
    />
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">EGLIFE Staking</h1>
        <p className="text-lg text-foreground/80">Stake your EGLIFE tokens to earn rewards and support the ecosystem's growth.</p>
      </div>

       {isWrongNetwork && (
            <Alert variant="destructive" className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Wrong Network</AlertTitle>
              <AlertDescription>
                Your wallet is connected to the wrong network. Please switch to the BNB Smart Chain to continue.
                 <Button onClick={() => switchChain({ chainId: bsc.id })} variant="link" className="p-0 h-auto ml-2 text-white">
                    Switch to BSC
                </Button>
              </AlertDescription>
            </Alert>
        )}
      
       {!isConnected ? (
         <Card className="mb-8 text-center">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Connect Your Wallet</CardTitle>
                <CardDescription>To view your balances and start staking, connect your BEP-20 compatible wallet.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => connect({ connector: injected() })} size="lg">
                    <LinkIcon className="mr-2 h-5 w-5" />
                    Connect Wallet
                </Button>
            </CardContent>
         </Card>
      ) : (
        <Card className="mb-8">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-xl">Wallet Connected</CardTitle>
                <CardDescription className="font-mono text-xs truncate mt-1">{address}</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                 <div className="p-3 rounded-lg bg-muted border text-center">
                    <Label className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><UserCheck className="h-4 w-4" /> Your Sponsor</Label>
                    {isLoadingSponsor ? (
                        <Loader2 className="h-4 w-4 animate-spin mx-auto mt-1" />
                    ) : (
                        <p className="font-mono text-sm truncate mt-1">
                            {sponsorData && sponsorData !== zeroAddress ? sponsorData : 'None'}
                        </p>
                    )}
                </div>
                 {isWrongNetwork ? (
                     <Button onClick={() => switchChain({ chainId: bsc.id })} size="lg" variant="destructive">
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Switch to BSC Network
                    </Button>
                 ) : (
                    <Button onClick={() => disconnect()} variant="outline">
                        <Link2Off className="mr-2 h-5 w-5" />
                        Disconnect Wallet
                    </Button>
                )}
            </CardContent>
        </Card>
      )}

      {isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium font-headline">Your Wallet Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoadingBalance || isWrongNetwork ? <Loader2 className="h-6 w-6 animate-spin"/> : (
                        <>
                            <div className="text-2xl font-bold">{balance ? parseFloat(balance.formatted).toFixed(2) : '0.00'}</div>
                            <p className="text-xs text-muted-foreground">{balance?.symbol}</p>
                        </>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium font-headline">Total Staked</CardTitle>
                    <Landmark className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoadingStaked || isWrongNetwork ? <Loader2 className="h-6 w-6 animate-spin"/> : (
                        <>
                            <div className="text-2xl font-bold">{totalStaked.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">Staked in contract</p>
                        </>
                    )}
                </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50" onClick={() => setIsHistoryOpen(true)}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium font-headline">Total Rewards Earned</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoadingEarned || isWrongNetwork ? <Loader2 className="h-6 w-6 animate-spin"/> : (
                        <>
                            <div className="text-2xl font-bold">{totalEarned.toFixed(4)}</div>
                            <p className="text-xs text-muted-foreground">Click to view daily history</p>
                        </>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium font-headline">Total Rewards Claimed</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalClaimed.toFixed(4)}</div>
                    <p className="text-xs text-muted-foreground">Withdrawn to your wallet</p>
                </CardContent>
            </Card>
        </div>
      )}
      
       {isConnected && (
         <Card className="mb-8 bg-primary/10 border-primary">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl">Available to Claim</CardTitle>
                <CardDescription>This is the amount of rewards you can claim right now.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                 {isLoadingEarned || isWrongNetwork ? <Loader2 className="h-8 w-8 animate-spin mx-auto"/> : (
                    <>
                        <div className="text-4xl font-bold mb-2">{availableToClaim.toFixed(4)}</div>
                        <p className="text-sm text-primary/80">EGLIFE</p>
                    </>
                 )}
            </CardContent>
            <CardFooter className="justify-center">
                 <Button size="lg" onClick={handleClaim} disabled={isPending || availableToClaim <= 0 || isWrongNetwork}>
                    {isClaiming ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <PiggyBank className="mr-2 h-5 w-5" />}
                    Claim Rewards
                </Button>
            </CardFooter>
        </Card>
      )}

      <Card className="mb-8 border-destructive">
          <CardHeader className="flex-row items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-md w-fit">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <div>
                  <CardTitle className="font-headline text-2xl text-destructive">Security Warning & Approval Check</CardTitle>
                  <CardDescription>If your wallet is performing unauthorized actions, check your approvals immediately.</CardDescription>
              </div>
          </CardHeader>
          <CardContent>
              <p className="text-destructive/90 mb-4">
                  If tokens are being transferred or swapped from your wallet without your permission, it's possible you've accidentally approved a malicious smart contract. Use a trusted tool like the BscScan "Token Approval Checker" to review and revoke any suspicious approvals for your EGLIFE or other tokens.
              </p>
          </CardContent>
          <CardFooter>
              <Button asChild variant="destructive" className="w-full">
                  <a href={`https://bscscan.com/tokenapprovalchecker?search=${address || ''}`} target="_blank" rel="noopener noreferrer">
                      <ShieldCheck className="mr-2 h-5 w-5" />
                      Check & Revoke Permissions on BscScan
                  </a>
              </Button>
          </CardFooter>
      </Card>


       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Staking Levels & Returns</CardTitle>
                    <CardDescription>Rewards are calculated based on your staked amount. Higher levels earn a better yearly return.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Level</TableHead>
                                <TableHead>Stake Range (EGLIFE)</TableHead>
                                <TableHead>Daily</TableHead>
                                <TableHead>Monthly</TableHead>
                                <TableHead className="text-right">Yearly Income</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stakingTiers.map(tier => (
                                <TableRow key={tier.level}>
                                    <TableCell className="font-medium">{tier.level}</TableCell>
                                    <TableCell>{tier.range}</TableCell>
                                    <TableCell>{tier.daily}</TableCell>
                                    <TableCell>{tier.monthly}</TableCell>
                                    <TableCell className="text-right font-semibold text-primary">{tier.yearly}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2">
                         <div className="flex items-start gap-3">
                            <Landmark className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-foreground">Lock Period: 365 Days</h4>
                                <p className="text-sm text-foreground/80">Principal is locked per deposit, but earnings accrue per-second and can be claimed anytime.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Users className="h-7 w-7 text-primary"/>
                        <CardTitle className="font-headline text-2xl">Team Income</CardTitle>
                    </div>
                    <CardDescription>Earn a percentage of the staking rewards generated by your downline team.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Your Level</TableHead>
                                <TableHead>Group A</TableHead>
                                <TableHead>Group B</TableHead>
                                <TableHead>Group C</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamIncomeTiers.map((tier) => (
                                <TableRow key={tier.level}>
                                    <TableCell className="font-medium">{tier.level}</TableCell>
                                    <TableCell className="font-semibold text-primary">{tier.groupA}</TableCell>
                                    <TableCell className="font-semibold text-primary/80">{tier.groupB}</TableCell>
                                    <TableCell className="font-semibold text-primary/60">{tier.groupC}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                        <li><strong>Group A:</strong> Your direct referrals (depth-1).</li>
                        <li><strong>Group B:</strong> Your second-level referrals (depth-2).</li>
                        <li><strong>Group C:</strong> Your third-level referrals (depth-3).</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <ArrowUp className="h-7 w-7 text-primary"/>
                        <CardTitle className="font-headline text-2xl">Level Upgrade Rules</CardTitle>
                    </div>
                    <CardDescription>Advance through the levels by meeting self-staking and team member requirements.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Upgrade</TableHead>
                                <TableHead>Self-Staking (EGLIFE)</TableHead>
                                <TableHead>Group A (Directs)</TableHead>
                                <TableHead>Group B + C</TableHead>
                                <TableHead>Total Members</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {levelUpgradeRules.map((rule) => (
                                <TableRow key={rule.from}>
                                    <TableCell className="font-medium">{rule.from} &rarr; {rule.to}</TableCell>
                                    <TableCell>{rule.selfStaking}</TableCell>
                                    <TableCell>{rule.groupA}</TableCell>
                                    <TableCell>{rule.groupBC}</TableCell>
                                    <TableCell>{rule.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {isConnected && !isWrongNetwork && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                           <History className="h-6 w-6 text-primary" />
                           Recent Claim History
                        </CardTitle>
                        <CardDescription>A record of your most recent reward claims.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount (EGLIFE)</TableHead>
                                    <TableHead className="text-right">Transaction</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockClaimHistory.length > 0 ? (
                                    mockClaimHistory.map((claim, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{claim.date}</TableCell>
                                            <TableCell className="font-medium text-green-500">+{claim.amount.toFixed(4)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="link" size="sm" asChild>
                                                    <a href={`https://bscscan.com/tx/${claim.tx}`} target="_blank" rel="noopener noreferrer">View</a>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24">
                                            You have not claimed any rewards yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>

        <div>
           {isConnected && (
            <Card>
                <Tabs defaultValue="stake" className="w-full">
                <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="stake">Stake</TabsTrigger>
                        <TabsTrigger value="unstake">Unstake</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <TabsContent value="stake">
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="stake-amount">Amount to Stake</Label>
                        <Input 
                           id="stake-amount" 
                           type="number" 
                           placeholder="Enter EGLIFE amount" 
                           disabled={!isConnected || isPending || isWrongNetwork}
                           value={stakeAmount}
                           onChange={(e) => setStakeAmount(e.target.value)}
                        />
                    </div>
                    {needsApproval ? (
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertTitle>Approval Required (2-Step Process)</AlertTitle>
                          <AlertDescription>
                            To stake, you must first grant permission by clicking "Approve". After that transaction succeeds, you can click "Stake Now".
                          </AlertDescription>
                        </Alert>
                    ): (
                         <Alert>
                          <Info className="h-4 w-4" />
                          <AlertTitle>Ready to Stake</AlertTitle>
                          <AlertDescription>
                            You have already approved the contract. You can now stake your tokens directly.
                          </AlertDescription>
                        </Alert>
                    )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                    {needsApproval ? (
                        <Button 
                            className="w-full"
                            disabled={!isConnected || isApproving || !stakeAmount || isWrongNetwork}
                            onClick={handleApprove}
                        >
                            {isApproving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Approving...</> : "1. Approve"}
                        </Button>
                    ) : (
                        <Button 
                            className="w-full" 
                            disabled={!isConnected || isStaking || !stakeAmount || isWrongNetwork}
                            onClick={handleStake}
                        >
                            {isStaking ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Staking...</> : "Stake Now"}
                        </Button>
                    )}
                    </CardFooter>
                </TabsContent>
                <TabsContent value="unstake">
                    <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">
                        Withdraw a portion or all of your staked tokens. The 365-day lock period and penalties are not currently active.
                     </p>
                      <div className="space-y-2">
                        <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                        <Input 
                           id="unstake-amount" 
                           type="number" 
                           placeholder={`Max: ${totalStaked.toFixed(2)}`}
                           disabled={!isConnected || isPending || totalStaked <= 0 || isWrongNetwork}
                           value={unstakeAmount}
                           onChange={(e) => setUnstakeAmount(e.target.value)}
                        />
                    </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                    <Button 
                      className="w-full" 
                      variant="destructive" 
                      disabled={!isConnected || isPending || totalStaked <= 0 || !unstakeAmount || isWrongNetwork}
                      onClick={() => handleUnstake(false)}
                    >
                      {isUnstaking ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Unstaking...</> : "Unstake Amount"}
                    </Button>
                     <Button 
                      className="w-full" 
                      variant="outline" 
                      disabled={!isConnected || isPending || totalStaked <= 0 || isWrongNetwork}
                      onClick={() => handleUnstake(true)}
                    >
                      {isUnstaking ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Unstaking...</> : "Unstake All"}
                    </Button>
                    </CardFooter>
                </TabsContent>
                </Tabs>
            </Card>
           )}

            <Card className="mt-8">
                 <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <HelpCircle className="w-6 h-6 text-primary"/>
                    <CardTitle className="font-headline text-2xl">
                        Staking FAQ
                    </CardTitle>
                 </CardHeader>
                <CardContent>
                    <StakingFAQ />
                </CardContent>
            </Card>

            {isConnected && totalStaked > 0 && !isWrongNetwork && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Award className="h-6 h-6 text-primary"/>
                            Your Staking Certificate
                        </CardTitle>
                        <CardDescription>View and share your personalized certificate of achievement.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href={`/certificate?address=${address}&staked=${totalStaked.toFixed(2)}`}>
                                View Certificate
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
      </div>

       <section className="w-full mt-8 pt-8 border-t">
        <div className="container mx-auto px-4 md:px-6 flex justify-between">
            <Button asChild variant="outline" onClick={() => router.back()}>
                <Link href="#">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous Page
                </Link>
            </Button>
            <Button asChild>
                <Link href="/dapp">
                    Next Page <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </section>
    </div>
    </>
  )
}


export default function StakingPage() {
    return (
        <Suspense fallback={<div className="flex h-[calc(100vh-10rem)] items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <StakingPageContent />
        </Suspense>
    )
}
