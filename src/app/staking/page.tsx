
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiggyBank, Landmark, Wallet, HelpCircle, AlertTriangle, Link as LinkIcon, Link2Off, ArrowRight, ArrowLeft } from "lucide-react"
import { StakingFAQ } from "@/components/staking-faq"
import { useAccount, useConnect, useBalance, useWriteContract, useDisconnect, useReadContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { parseEther, formatEther } from "viem"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const EGLIFE_TOKEN_CONTRACT = '0xca326a5e15b9451efC1A6BddaD6fB098a4D09113';
const EGLIFE_STAKING_CONTRACT = '0xC1921f78609Bd6C683940E3d43455b41ecE28e11'; 

const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"newPenaltyBps","type":"uint16"}],"name":"EarlyUnstakePenaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newLockPeriod","type":"uint256"}],"name":"LockPeriodUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"maxPayoutBps","type":"uint16"}],"name":"MaxReferralPayoutUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStake","type":"uint256"}],"name":"MinActiveStakeForReferralUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusAmount","type":"uint256"}],"name":"ReferralBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"ReferralBonusesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"royaltyBps","type":"uint16"}],"name":"RoyaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"SponsorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netStaked","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"indexed":false,"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"TiersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"TreasuryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"unstakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"BPS_DENOMINATOR","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LOCK_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REF_BONUS_BPS","outputs":[{"internalType":"uint16[10]","name":"","type":"uint16[10]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTierCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTiers","outputs":[{"internalType":"uint128[]","name":"mins","type":"uint128[]"},{"internalType":"uint16[]","name":"apys","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReferralPayoutBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"setReferralBonuses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint256"},{"internalType":"uint16","name":"bps","type":"uint16"}],"name":"setReferralBonusForLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLock","type":"uint256"}],"name":"setLockPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_max","type":"uint16"}],"name":"setMaxReferralPayoutBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_royaltyBps","type":"uint16"}],"name":"setRoyaltyBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"setTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint128","name":"lastClaim","type":"uint128"},{"internalType":"uint128","name":"accRewards","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierApyBps","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierMinAmount","outputs":[{"internalType":"uint128[]","name":"","type":"uint128[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const stakingTiers = [
    { name: "Starter Stake", amount: "10 - 100", apy: "12%" },
    { name: "Bronze Stake", amount: "101 - 500", apy: "18%" },
    { name: "Silver Stake", amount: "501 - 1,000", apy: "20%" },
    { name: "Gold Stake", amount: "1,001 - 5,000", apy: "22%" },
    { name: "Platinum Stake", amount: "5,001 - 10,000", apy: "24%" },
    { name: "Diamond Stake", amount: "10,001+", apy: "26%" },
];


export default function StakingPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter();
  const { toast } = useToast();

  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  
  const { data: balance, refetch: refetchBalance } = useBalance({
    address,
    token: EGLIFE_TOKEN_CONTRACT,
  })

  const { data: stakedData, refetch: refetchStakedBalance } = useReadContract({
    abi: stakingContractAbi,
    address: EGLIFE_STAKING_CONTRACT,
    functionName: 'stakedOf',
    args: [address],
    query: {
        enabled: !!address,
    }
  });

  const { data: earnedData, refetch: refetchEarned } = useReadContract({
    abi: stakingContractAbi,
    address: EGLIFE_STAKING_CONTRACT,
    functionName: 'earned',
    args: [address],
     query: {
        enabled: !!address,
        refetchInterval: 5000, // Refetch every 5 seconds
    }
  });


  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const { writeContract, isPending } = useWriteContract();

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const totalStaked = stakedData ? parseFloat(formatEther(stakedData as bigint)) : 0.00;
  const totalEarned = earnedData ? parseFloat(formatEther(earnedData as bigint)) : 0.00;

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid amount to stake.",
      });
      return;
    }

    const referrerAddress = "0x0000000000000000000000000000000000000000";

    writeContract({
        address: EGLIFE_STAKING_CONTRACT,
        abi: stakingContractAbi,
        functionName: 'stake',
        args: [parseEther(stakeAmount), referrerAddress],
    }, {
        onSuccess: () => {
            toast({
                title: "Staking Successful!",
                description: `You have successfully staked ${stakeAmount} EGLIFE.`,
            });
            refetchBalance();
            refetchStakedBalance();
            setStakeAmount("");
        },
        onError: (error) => {
             toast({
                variant: "destructive",
                title: "Staking Failed",
                description: error.shortMessage || "An unknown error occurred.",
            });
        }
    })
  };

  const handleUnstake = async () => {
      const amountToUnstake = unstakeAmount ? parseFloat(unstakeAmount) : totalStaked;
      if (amountToUnstake <= 0) {
          toast({ variant: "destructive", title: "Invalid Amount", description: "Please enter a valid amount to unstake." });
          return;
      }
      if (amountToUnstake > totalStaked) {
          toast({ variant: "destructive", title: "Invalid Amount", description: "You cannot unstake more than you have staked." });
          return;
      }

     writeContract({
        address: EGLIFE_STAKING_CONTRACT,
        abi: stakingContractAbi,
        functionName: 'unstake',
        args: [parseEther(amountToUnstake.toString())],
    }, {
        onSuccess: () => {
            toast({
                title: "Unstaking Successful!",
                description: `Your transaction to unstake ${amountToUnstake} EGLIFE has been submitted.`,
            });
            refetchBalance();
            refetchStakedBalance();
            setUnstakeAmount("");
        },
        onError: (error) => {
             toast({
                variant: "destructive",
                title: "Unstaking Failed",
                description: error.shortMessage || "An unknown error occurred.",
            });
        }
    })
  }

  const handleClaim = () => {
       writeContract({
        address: EGLIFE_STAKING_CONTRACT,
        abi: stakingContractAbi,
        functionName: 'claim',
        args: [],
    }, {
        onSuccess: () => {
            toast({
                title: "Claim Successful!",
                description: `Your rewards have been sent to your wallet.`,
            });
            refetchEarned();
            refetchBalance();
        },
        onError: (error) => {
             toast({
                variant: "destructive",
                title: "Claim Failed",
                description: error.shortMessage || "An unknown error occurred.",
            });
        }
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">EGLIFE Staking</h1>
        <p className="text-lg text-foreground/80">Stake your EGLIFE tokens to earn rewards and support the ecosystem's growth.</p>
      </div>
      
       {isClient && !isConnected && (
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
      )}
      
       {isClient && isConnected && (
         <Card className="mb-8 text-center">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Wallet Connected</CardTitle>
                <CardDescription>Your wallet is connected. You can now stake or unstake your tokens.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => disconnect()} variant="outline">
                    <Link2Off className="mr-2 h-5 w-5" />
                    Disconnect Wallet
                </Button>
            </CardContent>
         </Card>
      )}


      {isClient && isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-headline">Your EGLIFE Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{balance ? parseFloat(balance.formatted).toFixed(2) : '0.00'}</div>
                <p className="text-xs text-muted-foreground">{balance?.symbol}</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-headline">Total Staked</CardTitle>
                <Landmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalStaked.toFixed(2)}</div>
                 <p className="text-xs text-muted-foreground">Staked in contract</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-headline">Rewards Earned</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalEarned.toFixed(4)}</div>
                <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleClaim} disabled={isPending || totalEarned <= 0}>
                    Claim Rewards
                </Button>
            </CardContent>
            </Card>
        </div>
      )}

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Staking Tiers & Packages</CardTitle>
                    <CardDescription>Rewards are calculated based on your staked amount. Higher tiers earn a better APY.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Package Name</TableHead>
                                <TableHead>Staking Amount (EGLIFE)</TableHead>
                                <TableHead className="text-right">APY</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stakingTiers.map(tier => (
                                <TableRow key={tier.name}>
                                    <TableCell className="font-medium">{tier.name}</TableCell>
                                    <TableCell>{tier.amount}</TableCell>
                                    <TableCell className="text-right font-semibold text-primary">{tier.apy}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2">
                         <div className="flex items-start gap-3">
                            <Landmark className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-foreground">Lock Period: 365 Days</h4>
                                <p className="text-sm text-foreground/80">Principal is locked, but rewards can be claimed at any time.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-foreground">Early Unstake Penalty: 5%</h4>
                                <p className="text-sm text-foreground/80">A 5% penalty on the principal is applied if you unstake before 365 days. You will also forfeit any unclaimed rewards.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div>
           {isClient && (
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
                           disabled={!isConnected || isPending}
                           value={stakeAmount}
                           onChange={(e) => setStakeAmount(e.target.value)}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">The contract will automatically select the best APY tier for your amount.</p>
                    </CardContent>
                    <CardFooter>
                    <Button 
                        className="w-full" 
                        disabled={!isConnected || isPending || !stakeAmount}
                        onClick={handleStake}
                    >
                        {isPending ? "Staking..." : "Stake Now"}
                    </Button>
                    </CardFooter>
                </TabsContent>
                <TabsContent value="unstake">
                    <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">
                        Withdraw a portion or all of your staked tokens. An early unstake penalty may apply.
                     </p>
                      <div className="space-y-2">
                        <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                        <Input 
                           id="unstake-amount" 
                           type="number" 
                           placeholder={`Max: ${totalStaked.toFixed(2)}`}
                           disabled={!isConnected || isPending || totalStaked <= 0}
                           value={unstakeAmount}
                           onChange={(e) => setUnstakeAmount(e.target.value)}
                        />
                    </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                    <Button 
                      className="w-full" 
                      variant="destructive" 
                      disabled={!isConnected || isPending || totalStaked <= 0 || !unstakeAmount}
                      onClick={handleUnstake}
                    >
                      {isPending ? "Unstaking..." : "Unstake Amount"}
                    </Button>
                     <Button 
                      className="w-full" 
                      variant="outline" 
                      disabled={!isConnected || isPending || totalStaked <= 0}
                      onClick={() => {
                          setUnstakeAmount(totalStaked.toString());
                          handleUnstake();
                      }}
                    >
                      {isPending ? "..." : "Unstake All"}
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
  )
}

    