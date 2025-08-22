
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiggyBank, Landmark, Wallet, HelpCircle, ChevronsRight, AlertTriangle, Link as LinkIcon, Link2Off, ArrowRight, ArrowLeft } from "lucide-react"
import { StakingFAQ } from "@/components/staking-faq"
import { useAccount, useConnect, useBalance, useWriteContract, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { parseEther } from "viem"
import Link from "next/link"
import { useRouter } from "next/navigation"

const EGLIFE_TOKEN_CONTRACT = '0xca326a5e15b9451efC1A6BddaD6fB098a4D09113';
// This should be the address of your deployed EGLIFEStaking contract
const EGLIFE_STAKING_CONTRACT = '0xYourNewStakingContractAddressHere'; 

const stakingContractAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Staked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "reward",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "penalty",
        "type": "bool"
      }
    ],
    "name": "Unstaked",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "apy",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "calculateReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractTokenBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "earlyUnstakePenalty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "emergencyWithdrawTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lockPeriod",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_apy",
        "type": "uint256"
      }
    ],
    "name": "setAPY",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_lockPeriod",
        "type": "uint256"
      }
    ],
    "name": "setLockPeriod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_penalty",
        "type": "uint256"
      }
    ],
    "name": "setPenalty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "stakes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "withdrawn",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


export default function StakingPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter();
  useEffect(() => {
    setIsClient(true)
  }, [])

  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance, refetch: refetchBalance } = useBalance({
    address,
    token: EGLIFE_TOKEN_CONTRACT,
  })

  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState(""); // For unstake input
  const [totalStaked, setTotalStaked] = useState(0.00); // Placeholder
  const { toast } = useToast();
  const { writeContract, isPending } = useWriteContract();

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid amount to stake.",
      });
      return;
    }

    writeContract({
        address: EGLIFE_STAKING_CONTRACT,
        abi: stakingContractAbi,
        functionName: 'stake',
        args: [parseEther(stakeAmount)],
    }, {
        onSuccess: () => {
            toast({
                title: "Staking Successful!",
                description: `You have successfully staked ${stakeAmount} EGLIFE.`,
            });
            // In a real app, you would refetch the staked balance from the contract
            setTotalStaked(prevStaked => prevStaked + parseFloat(stakeAmount));
            refetchBalance();
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
     writeContract({
        address: EGLIFE_STAKING_CONTRACT,
        abi: stakingContractAbi,
        functionName: 'unstake',
        args: [],
    }, {
        onSuccess: () => {
            toast({
                title: "Unstaking Successful!",
                description: `Your staked tokens and rewards have been sent to your wallet.`,
            });
             // In a real app, you would refetch the staked balance from the contract
            setTotalStaked(0);
            refetchBalance();
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
                <CardTitle className="text-sm font-medium font-headline">Total Rewards Earned</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">0.00</div>
                <p className="text-xs text-muted-foreground">Rewards calculated in real-time</p>
            </CardContent>
            </Card>
        </div>
      )}

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Core Staking Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground/80">
                    <div className="flex items-start gap-3">
                        <ChevronsRight className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-foreground">Annual Reward (APY): 12%</h4>
                            <p>Rewards are calculated based on your staked amount and the time staked. The APY is configurable by the admin.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ChevronsRight className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                         <div>
                            <h4 className="font-semibold text-foreground">Lock Period: 365 Days</h4>
                            <p>Your principal staked amount is intended to be locked for 365 days to maximize rewards.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                         <div>
                            <h4 className="font-semibold text-foreground">Early Unstake Penalty: 5%</h4>
                            <p>If you unstake before the 365-day lock period ends, a 5% penalty will be applied to your total return (principal + rewards).</p>
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
                    <p className="text-sm text-muted-foreground">You can only stake once. To add more, you must unstake first.</p>
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
                        Click the button below to withdraw all your staked tokens and your earned rewards. An early unstake penalty may apply.
                     </p>
                    </CardContent>
                    <CardFooter>
                    <Button 
                      className="w-full" 
                      variant="outline" 
                      disabled={!isConnected || isPending}
                      onClick={handleUnstake}
                    >
                      {isPending ? "Unstaking..." : "Unstake All Tokens"}
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

    
