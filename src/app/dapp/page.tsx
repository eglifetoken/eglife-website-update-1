
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, Wallet, Link as LinkIcon, Link2Off, IndianRupee, Loader2, Copy, Users, UserCheck, BarChart, TrendingUp, Landmark, Repeat, DollarSign, PiggyBank, Gift, User as UserIcon, Calendar, PieChart, HandCoins, Info, HelpCircle, AlertTriangle, ShieldCheck, Users2, Clapperboard } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useAccount, useConnect, useDisconnect, useBalance, useReadContract, useChainId, useWriteContract, useSwitchChain, useWatchContractEvent } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { formatEther, parseEther, zeroAddress, type BaseError } from "viem";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { bsc } from "wagmi/chains";
import Image from "next/image";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const EGLIFE_STAKING_CONTRACT = "0x90B374f87726F172504501c0B91eeEbadB5FE230"; 
const PANCAKESWAP_SWAP_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;

const tokenContractAbi = [{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_defaultAdmin","type":"address"},{"internalType":"address","name":"_rewardsWallet","type":"address"},{"internalType":"address","name":"_referralWallet","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessControlBadConfirmation","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"neededRole","type":"bytes32"}],"name":"AccessControlUnauthorizedAccount","type":"error"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"newLevel","type":"uint8"}],"name":"LevelUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referee","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"reason","type":"string"}],"name":"SponsorBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"}],"name":"SponsorUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"downline","type":"address"},{"indexed":true,"internalType":"address","name":"upline","type":"address"},{"indexed":false,"internalType":"uint8","name":"depth","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"uplineLevel","type":"uint8"}],"name":"TeamIncomePaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"level","type":"uint16","name":"aBps","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"bBps","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"cBps","type":"uint16"}],"name":"TeamPercentSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardsWallet","type":"address"},{"indexed":false,"internalType":"address","name":"referralWallet","type":"address"},{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"WalletsUpdated","type":"event"},{"inputs":[],"name":"ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"adminReassignSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"adminRecomputeLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"activated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"defaultSponsor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"directCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"a","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"firstStakeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"uint256","name":"limit","type":"uint256"}],"name":"getDirects","outputs":[{"internalType":"address[]","name":"out","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"root","type":"address"}],"name":"getLevelCounts","outputs":[{"internalType":"uint256[3]","name":"depthCounts","type":"uint256[3]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"root","type":"address"},{"internalType":"uint8","name":"depth","type":"uint8"},{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"uint256","name":"limit","type":"uint256"}],"name":"getTeamAtDepth","outputs":[{"internalType":"address[]","name":"out","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initDefaultLevelRules","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initDefaultTeamPercents","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initDefaultTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastAccrual","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"levelRules","outputs":[{"internalType":"uint256","name":"selfMin","type":"uint256"},{"internalType":"uint256","name":"selfMax","type":"uint256"},{"internalType":"uint16","name":"minA","type":"uint16"},{"internalType":"uint16","name":"minBC","type":"uint16"},{"internalType":"uint16","name":"minTotal","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purchaseSponsorBonusAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referee","type":"address"}],"name":"recordPurchaseSponsorBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"recomputeMyLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"callerConfirmation","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SECONDS_PER_YEAR","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"s","type":"address"}],"name":"setDefaultSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"level","type":"uint8"},{"components":[{"internalType":"uint256","name":"selfMin","type":"uint256"},{"internalType":"uint256","name":"selfMax","type":"uint256"},{"internalType":"uint16","name":"minA","type":"uint16"},{"internalType":"uint16","name":"minBC","type":"uint16"},{"internalType":"uint16","name":"minTotal","type":"uint16"}],"internalType":"struct EGLifeStakingV3.LevelRule","name":"r","type":"tuple"}],"name":"setLevelRule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lockPeriod","type":"uint256"},{"internalType":"uint16","name":"_penaltyBps","type":"uint16"}],"name":"setLockAndPenalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"setPurchaseSponsorBonusAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"setStakingSponsorBonusAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"level","type":"uint8"},{"internalType":"uint16","name":"aBps","type":"uint16"},{"internalType":"uint16","name":"bBps","type":"uint16"},{"internalType":"uint16","name":"cBps","type":"uint16"}],"name":"setTeamPercentRow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"idx","type":"uint256"},{"internalType":"uint256","name":"minAmt","type":"uint256"},{"internalType":"uint256","name":"maxAmt","type":"uint256"},{"internalType":"uint16","name":"aprBps","type":"uint16"}],"name":"setTier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"on","type":"bool"}],"name":"setUseTieredAPR","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewards","type":"address"},{"internalType":"address","name":"_referral","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"name":"setWallets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"sponsorBonusStatus","outputs":[{"internalType":"bool","name":"purchasePaid","type":"bool"},{"internalType":"bool","name":"stakePaid","type":"bool"},{"internalType":"uint256","name":"purchaseAmt","type":"uint256"},{"internalType":"uint256","name":"stakeAmt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsorOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingSponsorBonusAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"teamPercentsBpsByLevel","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"tiers","outputs":[{"internalType":"uint256","name":"min","type":"uint256"},{"internalType":"uint256","name":"max","type":"uint256"},{"internalType":"uint16","name":"aprBps","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"useTieredAPR","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

type SponsorBonusPaidLog = { eventName: 'SponsorBonusPaid', args: { referee?: `0x${string}`; sponsor?: `0x${string}`; amount?: bigint; reason?: string; }};
type TeamIncomePaidLog = { eventName: 'TeamIncomePaid', args: { downline?: `0x${string}`; upline?: `0x${string}`; depth?: number; amount?: bigint; uplineLevel?: number; }};


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
  const [claimAmount, setClaimAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  
  // State for income tracking
  const [totalReferralIncome, setTotalReferralIncome] = useState(0);
  const [totalTeamIncome, setTotalTeamIncome] = useState(0);
  const [todayReferralIncome, setTodayReferralIncome] = useState(0);
  const [todayTeamIncome, setTodayTeamIncome] = useState(0);
  const [todayStakingIncome, setTodayStakingIncome] = useState(0);

  const { writeContractAsync } = useWriteContract();

  const { data: egldBalance, isLoading: isLoadingEgld, refetch: refetchEgldBalance } = useBalance({ address, token: EGLIFE_CONTRACT_ADDRESS, query: { enabled: !isWrongNetwork && !!address } });
  const { data: bnbBalance, isLoading: isLoadingBnb } = useBalance({ address, query: { enabled: !isWrongNetwork && !!address } });
  
  const { data: stakedData, isLoading: isLoadingStaked, refetch: refetchStakedBalance } = useReadContract({ abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'stakedBalance', args: address ? [address] : undefined, query: { enabled: !isWrongNetwork && !!address } });
  const { data: earnedData, isLoading: isLoadingEarned, refetch: refetchEarned } = useReadContract({ abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'earned', args: address ? [address] : undefined, query: { enabled: !isWrongNetwork && !!address, refetchInterval: 15000 } });
  const { data: sponsorData, isLoading: isLoadingSponsor } = useReadContract({ abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'sponsorOf', args: address ? [address] : undefined, query: { enabled: !isWrongNetwork && !!address }});
  const { data: allowance, refetch: refetchAllowance } = useReadContract({ abi: tokenContractAbi, address: EGLIFE_CONTRACT_ADDRESS, functionName: 'allowance', args: address ? [address, EGLIFE_STAKING_CONTRACT] : undefined, query: { enabled: !!address && !isWrongNetwork } });
  
  const { data: teamCounts, isLoading: isLoadingTeamCounts } = useReadContract({
    abi: stakingContractAbi,
    address: EGLIFE_STAKING_CONTRACT,
    functionName: 'getLevelCounts',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !isWrongNetwork,
      refetchInterval: 15000,
    },
  });

  const referralLink = isClient ? `${window.location.origin}/register?ref=${address}` : "";

  useWatchContractEvent({
    address: EGLIFE_STAKING_CONTRACT,
    abi: stakingContractAbi,
    eventName: 'SponsorBonusPaid',
    onLogs(logs: readonly SponsorBonusPaidLog[]) {
      if (!address) return;
      let sessionBonus = 0;
      logs.forEach(log => {
        if (log.args.sponsor?.toLowerCase() === address.toLowerCase() && log.args.amount) {
          sessionBonus += parseFloat(formatEther(log.args.amount));
        }
      });
      if (sessionBonus > 0) {
        setTotalReferralIncome(prev => prev + sessionBonus);
        setTodayReferralIncome(prev => prev + sessionBonus);
      }
    },
  });

  useWatchContractEvent({
    address: EGLIFE_STAKING_CONTRACT,
    abi: stakingContractAbi,
    eventName: 'TeamIncomePaid',
    onLogs(logs: readonly TeamIncomePaidLog[]) {
      if (!address) return;
      let sessionBonus = 0;
      logs.forEach(log => {
        if (log.args.upline?.toLowerCase() === address.toLowerCase() && log.args.amount) {
          sessionBonus += parseFloat(formatEther(log.args.amount));
        }
      });
      if (sessionBonus > 0) {
        setTotalTeamIncome(prev => prev + sessionBonus);
        setTodayTeamIncome(prev => prev + sessionBonus);
      }
    },
  });


  useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect for calculating today's staking income
  useEffect(() => {
    if (typeof window === 'undefined' || !earnedData) return;

    const key = `lastKnownEarned_${address}`;
    const lastKnownEarnedStr = localStorage.getItem(key);
    const currentEarned = parseFloat(formatEther(earnedData));

    if (lastKnownEarnedStr) {
      const lastKnownEarned = parseFloat(lastKnownEarnedStr);
      if (currentEarned > lastKnownEarned) {
        const diff = currentEarned - lastKnownEarned;
        setTodayStakingIncome(prev => prev + diff);
      }
    }
    
    localStorage.setItem(key, currentEarned.toString());

  }, [earnedData, address]);


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
    const totalStaked = stakedData ? parseFloat(formatEther(stakedData as bigint)) : 0;
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

  const handleClaim = async (isClaimAll = false) => {
       setIsClaiming(true);
       try {
        const availableToClaimNum = earnedData ? parseFloat(formatEther(earnedData)) : 0;
        const amountToClaimNum = isClaimAll ? availableToClaimNum : (claimAmount ? parseFloat(claimAmount) : 0);

        if (amountToClaimNum <= 0) {
            toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter an amount greater than zero to claim." });
            setIsClaiming(false);
            return;
        }

        if (!isClaimAll && amountToClaimNum > availableToClaimNum) {
            toast({ variant: "destructive", title: "Invalid Amount", description: "You cannot claim more than you have earned." });
            setIsClaiming(false);
            return;
        }
        
        const amountToClaim = isClaimAll ? (earnedData ?? 0n) : parseEther(amountToClaimNum.toString());

        await writeContractAsync({ address: EGLIFE_STAKING_CONTRACT, abi: stakingContractAbi, functionName: 'claim', args: [amountToClaim] });
        
        toast({ title: "Claim Successful!", description: `Your rewards have been sent to your wallet.` });
        
        // On successful claim, reset today's staking income tracker in local storage
        if (typeof window !== 'undefined' && address) {
            if (isClaimAll) {
                localStorage.setItem(`lastKnownEarned_${address}`, '0');
                setTodayStakingIncome(0);
            } else {
                const currentEarned = parseFloat(localStorage.getItem(`lastKnownEarned_${address}`) || '0');
                localStorage.setItem(`lastKnownEarned_${address}`, (currentEarned - amountToClaimNum).toString());
            }
        }
        
        setClaimAmount("");
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
                <CardContent><Button onClick={() => connect({ connector: injected({ shimDisconnect: true }) })} className="w-full" size="lg"><Wallet className="mr-2 h-5 w-5" />Connect Wallet</Button></CardContent>
            </Card>
        </div>
    )
  }
  
  const isPending = isProcessing || isClaiming;
  const parsedStakeAmount = stakeAmount ? parseEther(stakeAmount) : 0n;
  const needsApproval = allowance !== undefined && parsedStakeAmount > 0 && allowance < parsedStakeAmount;
  const buttonText = isProcessing ? "Processing..." : needsApproval ? "Approve & Stake" : "Stake Now";
  const totalStakedNum = stakedData ? parseFloat(formatEther(stakedData as bigint)) : 0;
  const availableToClaimNum = earnedData ? parseFloat(formatEther(earnedData as bigint)) : 0;
  const sponsorToDisplay = sponsorData && sponsorData !== zeroAddress ? sponsorData : "N/A";
  
  const groupA = teamCounts ? Number(teamCounts[0]) : 0;
  const groupB = teamCounts ? Number(teamCounts[1]) : 0;
  const groupC = teamCounts ? Number(teamCounts[2]) : 0;
  const totalTeam = groupA + groupB + groupC;


  return (
    <div className="min-h-screen bg-background text-white p-4 space-y-6">
        <header className="flex justify-between items-center">
            <div/>
            <Button onClick={() => disconnect()} variant="ghost" className="text-white hover:bg-white/10">
                <Link2Off className="mr-2"/>
                Logout
            </Button>
        </header>

        <main className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">DApp Dashboard</h1>
                <p className="text-lg text-foreground/80 mt-2">Your central hub for staking, rewards, and team management.</p>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">User ID:</p><p className="text-xs font-mono break-all">{address}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Sponsor ID:</p>
                        {isLoadingSponsor ? <Loader2 className="h-4 w-4 animate-spin" /> : <p className="text-xs font-mono break-all">{sponsorToDisplay}</p>}
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
              <CardHeader>
                <div className="flex items-center gap-2">
                    <HandCoins className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-xl">Claim Rewards</CardTitle>
                </div>
                 <CardDescription>Available to Claim: <span className="font-bold text-white">{availableToClaimNum.toFixed(4)} EGLIFE</span></CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="claim-amount">Amount to Claim</Label>
                    <Input id="claim-amount" type="number" placeholder={`Max: ${availableToClaimNum.toFixed(4)}`} value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} disabled={isClaiming || isWrongNetwork || availableToClaimNum <= 0} />
                </div>
              </CardContent>
               <CardFooter className="flex-col sm:flex-row gap-2">
                  <Button className="w-full" onClick={() => handleClaim(false)} disabled={isClaiming || !claimAmount || parseFloat(claimAmount) <= 0 || isWrongNetwork}>{isClaiming && claimAmount ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Claiming...</> : 'Claim Amount'}</Button>
                  <Button className="w-full" variant="outline" onClick={() => handleClaim(true)} disabled={isClaiming || availableToClaimNum <= 0 || isWrongNetwork}>{isClaiming && !claimAmount ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Claiming...</> : 'Claim All'}</Button>
              </CardFooter>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <BarChart className="h-6 w-6 text-primary" />
                        <CardTitle className="font-headline text-xl">Total Income Summary</CardTitle>
                    </div>
                    <CardDescription>Your lifetime earnings from all sources in the ecosystem.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="h-5 w-5 text-primary/80" />
                            <span className="text-sm">Total Staking Income</span>
                        </div>
                        <span className="font-mono text-sm">{isLoadingEarned ? '...' : availableToClaimNum.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                            <Gift className="h-5 w-5 text-primary/80" />
                            <span className="text-sm">Total Referral Income</span>
                        </div>
                        <span className="font-mono text-sm">{totalReferralIncome.toFixed(4)}</span>
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                            <Clapperboard className="h-5 w-5 text-primary/80" />
                            <span className="text-sm">Total Level Income</span>
                        </div>
                        <span className="font-mono text-sm">0.0000</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-primary/80" />
                            <span className="text-sm">Total Team Income</span>
                        </div>
                        <span className="font-mono text-sm">{totalTeamIncome.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-primary/80" />
                            <span className="text-sm">Total EGPAY Rewards</span>
                        </div>
                        <span className="font-mono text-sm">0.0000</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-6 w-6 text-primary" />
                        <CardTitle className="font-headline text-xl">Today's Income</CardTitle>
                    </div>
                    <CardDescription>Live income for your current session. This will reset on page refresh.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="h-5 w-5 text-primary/80" />
                            <span className="text-sm">Today's Staking Income</span>
                        </div>
                        <span className="font-mono text-sm">{todayStakingIncome.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                            <Gift className="h-5 w-5 text-primary/80" />
                            <span className="text-sm">Today's Referral Income</span>
                        </div>
                        <span className="font-mono text-sm">{todayReferralIncome.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                            <Clapperboard className="h-5 w-5 text-primary/80" />
                            <span className="text-sm">Today's Level Income</span>
                        </div>
                        <span className="font-mono text-sm">0.0000</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-primary/80" />
                            <span className="text-sm">Today's Team Income</span>
                        </div>
                        <span className="font-mono text-sm">{todayTeamIncome.toFixed(4)}</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Users2 className="h-6 w-6 text-primary" />
                        <CardTitle className="font-headline text-xl">Team Details</CardTitle>
                    </div>
                    <CardDescription>An overview of your team structure, updated live from the contract.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Card className="bg-black/20">
                        <CardHeader className="flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Team</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{isLoadingTeamCounts ? <Loader2 className="animate-spin" /> : totalTeam}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/20">
                        <CardHeader className="flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Group A (Directs)</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                             <div className="text-2xl font-bold">{isLoadingTeamCounts ? <Loader2 className="animate-spin" /> : groupA}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/20">
                        <CardHeader className="flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Group B</CardTitle>
                            <Users2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{isLoadingTeamCounts ? <Loader2 className="animate-spin" /> : groupB}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/20">
                        <CardHeader className="flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Group C</CardTitle>
                            <Users2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{isLoadingTeamCounts ? <Loader2 className="animate-spin" /> : groupC}</div>
                        </CardContent>
                    </Card>
                </CardContent>
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

    