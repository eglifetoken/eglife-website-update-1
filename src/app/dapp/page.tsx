
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Briefcase, Landmark, Repeat, ShoppingCart, Users, Vote, Wallet, Link as LinkIcon, Link2Off, IndianRupee, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { formatUnits } from "viem";
import { useRouter } from "next/navigation";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
const PANCAKESWAP_SWAP_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;


const ecosystemComponents = [
  {
    icon: Landmark,
    title: "Token Staking",
    description: "Stake your EGLIFE tokens to earn competitive rewards and help secure the network.",
    link: "/staking",
    status: "Live",
    statusVariant: "default",
    aiHint: "bank building"
  },
   {
    icon: Briefcase,
    title: "EGPAY Services",
    description: "Pay for utility bills and other services directly with your EGLIFE tokens.",
    link: "/services",
    status: "Live",
    statusVariant: "default",
    aiHint: "briefcase"
  },
  {
    icon: Users,
    title: "Referral Program",
    description: "Earn bonuses by inviting new users to join the EGLIFE staking platform.",
    link: "/referral",
    status: "Live",
    statusVariant: "default",
    aiHint: "people network"
  },
  {
    icon: Vote,
    title: "Community Governance",
    description: "Participate in key project decisions by voting with your staked EGLIFE.",
    link: "#",
    status: "Upcoming",
    statusVariant: "secondary",
    aiHint: "voting box"
  },
  {
    icon: ShoppingCart,
    title: "Merchant Gateway",
    description: "Accept EGLIFE as payment for goods and services at your business.",
    link: "#",
    status: "Upcoming",
    statusVariant: "secondary",
    aiHint: "shopping cart"
  },
];

export default function DappPage() {
  const [isClient, setIsClient] = useState(false);
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const router = useRouter();

  const { data: egldBalance, isLoading: isLoadingEgld } = useBalance({ address, token: EGLIFE_CONTRACT_ADDRESS as `0x${string}` })
  const { data: bnbBalance, isLoading: isLoadingBnb } = useBalance({ address, })
  const { data: usdtBalance, isLoading: isLoadingUsdt } = useBalance({ address, token: USDT_CONTRACT_ADDRESS as `0x${string}` })


  useEffect(() => {
    setIsClient(true);
  }, []);

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
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Eglife Ecosystem</h1>
        <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
          Explore the suite of tools and platforms that make up the Eglife universe. Each component is designed to add real-world utility to your tokens.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="lg:col-span-3">
            <CardHeader>
                <div className="flex items-center gap-3">
                     <div className="p-3 bg-primary/10 rounded-md w-fit">
                        <Wallet className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-2xl">Your Wallet</CardTitle>
                        <CardDescription>Connect to view balances and interact with the DApp.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {!isConnected ? (
                    <div className="text-center">
                        <p className="mb-4">Connect your wallet to get started.</p>
                        <Button onClick={() => connect({ connector: injected() })}>
                            <LinkIcon className="mr-2 h-5 w-5" />
                            Connect Wallet
                        </Button>
                    </div>
                ) : (
                    address && (
                         <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg bg-muted/50 border mb-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">Connected Wallet</p>
                                    <p className="font-mono text-sm truncate">{address}</p>
                                </div>
                                <Button onClick={() => disconnect()} variant="outline" size="sm">
                                    <Link2Off className="mr-2 h-4 w-4" />
                                    Disconnect
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">EGLIFE Balance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {isLoadingEgld ? <Loader2 className="h-6 w-6 animate-spin"/> : (
                                            <>
                                                <p className="text-xl font-bold">{egldBalance ? parseFloat(formatUnits(egldBalance.value, egldBalance.decimals)).toFixed(2) : '0.00'}</p>
                                                <p className="text-xs text-muted-foreground">{egldBalance?.symbol}</p>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                                 <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">BNB Balance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {isLoadingBnb ? <Loader2 className="h-6 w-6 animate-spin"/> : (
                                            <>
                                                <p className="text-xl font-bold">{bnbBalance ? parseFloat(formatUnits(bnbBalance.value, bnbBalance.decimals)).toFixed(4) : '0.00'}</p>
                                                <p className="text-xs text-muted-foreground">{bnbBalance?.symbol}</p>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                                 <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">USDT Balance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {isLoadingUsdt ? <Loader2 className="h-6 w-6 animate-spin"/> : (
                                            <>
                                                <p className="text-xl font-bold">{usdtBalance ? parseFloat(formatUnits(usdtBalance.value, usdtBalance.decimals)).toFixed(2) : '0.00'}</p>
                                                <p className="text-xs text-muted-foreground">{usdtBalance?.symbol}</p>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                         </div>
                    )
                )}
            </CardContent>
             <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="w-full" size="lg">
                    <Link href={PANCAKESWAP_SWAP_URL} target="_blank" rel="noopener noreferrer">
                        <Repeat className="mr-2 h-5 w-5" />
                        Swap on PancakeSwap
                    </Link>
                  </Button>
                  <Button asChild className="w-full" size="lg" variant="outline">
                    <Link href="/buy-with-inr">
                        <IndianRupee className="mr-2 h-5 w-5" />
                        Buy with INR
                    </Link>
                  </Button>
              </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ecosystemComponents.map((component) => {
          const Icon = component.icon;
          return (
            <Card key={component.title} className="flex flex-col hover:shadow-lg transition-shadow">
               <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="p-3 bg-primary/10 rounded-md w-fit">
                        <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant={component.statusVariant as any}>{component.status}</Badge>
                </div>
                <CardTitle className="font-headline pt-4">{component.title}</CardTitle>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                  <Link href={component.link} className="text-sm font-medium text-accent hover:underline flex items-center mt-4">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <section className="w-full mt-16 pt-8 border-t">
        <div className="container mx-auto px-4 md:px-6 flex justify-between">
            <Button asChild variant="outline" onClick={() => router.back()}>
                <Link href="#">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous Page
                </Link>
            </Button>
            <Button asChild>
                <Link href="/referral">
                    Next Page <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </section>
      
    </div>
  );
}

    