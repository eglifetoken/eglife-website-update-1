
"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Landmark, Briefcase, Award, Zap, Gift, ShieldCheck, TrendingUp, DollarSign, Package, BarChart, FileText } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTokenData, TokenData } from "@/ai/flows/getTokenData";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const PANCAKESWAP_BUY_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;

const features = [
  {
    icon: Zap,
    title: "Real-World Utility",
    description: "Use EGLIFE as the primary token for all transactions on the EGPAY platform, including utility bills and mobile recharges.",
    aiHint: "lightning bolt"
  },
  {
    icon: TrendingUp,
    title: "Staking Rewards",
    description: "Stake your tokens in our on-chain contract to earn a competitive, passive yield and contribute to the network's stability.",
    aiHint: "upward chart"
  },
  {
    icon: Gift,
    title: "Community Growth",
    description: "Participate in our multi-level referral program to earn instant bonuses for helping our community grow.",
    aiHint: "gift box"
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description: "Built on the secure BNB Smart Chain with a publicly verified smart contract for complete transparency.",
    aiHint: "shield check"
  }
];

const ecosystemComponents = [
  {
    icon: Landmark,
    title: "Token Staking",
    description: "Stake your EGLIFE tokens to earn competitive rewards and help secure the network.",
    link: "/staking",
    aiHint: "bank building"
  },
   {
    icon: Briefcase,
    title: "EGPAY Services",
    description: "Pay for utility bills and other services directly with your EGLIFE tokens.",
    link: "/services",
    aiHint: "briefcase"
  },
  {
    icon: Users,
    title: "Referral Program",
    description: "Earn bonuses by inviting new users to join the EGLIFE staking platform.",
    link: "/referral",
    aiHint: "people network"
  },
  {
    icon: FileText,
    title: "Whitepaper",
    description: "Read our detailed whitepaper to understand the project's vision, tokenomics, and roadmap.",
    link: "/whitepaper",
    aiHint: "document text"
  },
];

function TokenStats() {
    const [tokenData, setTokenData] = useState<TokenData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTokenData();
                setTokenData(data);
            } catch (error) {
                console.error("Failed to fetch token data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
        return () => clearInterval(interval);
    }, []);

    const stats = [
        {
            icon: DollarSign,
            label: "Price (USD)",
            value: tokenData ? `$${tokenData.priceUsd.toFixed(5)}` : null,
            change: tokenData?.priceChangePercentage24h
        },
        {
            icon: Package,
            label: "Market Cap",
            value: tokenData ? `$${(tokenData.marketCapUsd / 1_000_000).toFixed(2)}M` : null
        },
        {
            icon: BarChart,
            label: "24h Volume",
            value: tokenData ? `$${(tokenData.volume24hUsd / 1_000).toFixed(2)}K` : null
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, index) => {
                const ChangeIcon = stat.change && stat.change > 0 ? TrendingUp : TrendingUp; // Simple for now
                const changeColor = stat.change ? (stat.change > 0 ? 'text-green-500' : 'text-red-500') : 'text-muted-foreground';

                return (
                    <Card key={index} className="bg-card/50 backdrop-blur-sm border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                            <stat.icon className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <>
                                  <Skeleton className="h-8 w-3/4 mb-1" />
                                  <Skeleton className="h-4 w-1/2" />
                                </>
                            ) : (
                                <>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    {stat.change !== undefined && (
                                        <p className={`text-xs ${changeColor} flex items-center`}>
                                            <ChangeIcon className="w-3 h-3 mr-1" />
                                            {stat.change.toFixed(2)}% (24h)
                                        </p>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}


export default function Home() {
  return (
    <div className="flex flex-col items-center bg-background">
      <section className="relative w-full h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
        <Image
          src="/background.png"
          alt="Abstract network background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter mb-6 text-white leading-tight">
              The BEP-20 Utility Token for <span className="text-primary">Your Daily Life</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
              Stake for rewards, pay for real-world services on the EGPAY platform, and join a growing ecosystem built for mass adoption.
            </p>
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button asChild size="lg" className="font-bold text-base">
                  <Link href="/dapp">Login</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold text-base border-primary text-primary hover:bg-primary/10 hover:text-primary">
                  <Link href="/register">Registration</Link>
                </Button>
              </div>
               <Button asChild size="lg" variant="secondary" className="w-full font-bold text-base">
                <Link href={PANCAKESWAP_BUY_URL} target="_blank" rel="noopener noreferrer">Buy on PancakeSwap</Link>
              </Button>
            </div>
        </div>
      </section>

      <section id="stats" className="w-full -mt-32 md:-mt-24 pb-16 md:pb-24 z-20 relative">
          <div className="container mx-auto px-4 md:px-6">
              <TokenStats />
          </div>
      </section>

      <section id="why-eglife" className="w-full py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Choose EGLIFE?</h2>
                  <p className="text-lg text-foreground/80 mt-2 max-w-3xl mx-auto">
                      EGLIFE is more than just a token. It's a complete ecosystem designed to bridge the gap between digital currency and real-world utility.
                  </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature) => {
                      const Icon = feature.icon;
                      return (
                          <div key={feature.title} className="text-center p-6">
                              <div className="flex items-center justify-center mb-4">
                                  <div className="p-4 bg-primary/10 rounded-full">
                                      <Icon className="h-8 w-8 text-primary" />
                                  </div>
                              </div>
                              <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                              <p className="text-foreground/70">{feature.description}</p>
                          </div>
                      );
                  })}
              </div>
          </div>
      </section>


       <section id="ecosystem" className="w-full py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Ecosystem</h2>
                <p className="text-lg text-foreground/80 mt-2 max-w-3xl mx-auto">
                    Explore the suite of tools and platforms that make up the EGLIFE universe, designed to add real utility to your tokens.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {ecosystemComponents.map((component) => {
                const Icon = component.icon;
                return (
                    <Card key={component.title} className="flex flex-col text-left p-6 hover:border-primary transition-colors hover:shadow-lg">
                        <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                            <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-2">{component.title}</h3>
                        <p className="text-foreground/70 mb-4 flex-grow">{component.description}</p>
                        <Button asChild variant="link" className="text-primary p-0 h-auto justify-start">
                            <Link href={component.link}>Explore &rarr;</Link>
                        </Button>
                    </Card>
                );
                })}
            </div>
        </div>
      </section>

      <section id="get-started" className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
               <h2 className="text-3xl md:text-4xl font-headline font-bold">Get Started Today</h2>
               <p className="text-lg text-foreground/80 mt-2 max-w-3xl mx-auto mb-8">
                  Join our growing community and become part of the future of decentralized finance.
                </p>
                <Button asChild size="lg" className="font-bold text-lg">
                  <Link href="/register">Create an Account</Link>
                </Button>
          </div>
      </section>
    </div>
  );
}
