

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, Landmark, Repeat, ShoppingCart, Users, Vote, Wallet, DollarSign } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const PANCAKESWAP_BUY_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;
const PANCAKESWAP_SELL_URL = `https://pancakeswap.finance/swap?inputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;

const generateChartData = (basePrice: number) => {
  const data = [];
  let currentPrice = basePrice * (1 - (Math.random() * 0.1 - 0.05)); // Start slightly off
  for (let i = 0; i < 15; i++) {
    data.push({ price: currentPrice });
    currentPrice *= (1 + (Math.random() * 0.04 - 0.02)); // smaller fluctuations
  }
  // Ensure the last point is close to the live price
  data[data.length - 1] = { price: basePrice };
  return data;
}


const ecosystemComponents = [
  {
    icon: Repeat,
    title: "Trade EGLIFE",
    description: "The central hub for managing your EGLIFE tokens and interacting with the ecosystem.",
    link: "/dashboard",
    status: "Live",
    statusVariant: "default",
    aiHint: "token exchange"
  },
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
    link: "/whitepaper",
    status: "Upcoming",
    statusVariant: "secondary",
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
  const [livePrice, setLivePrice] = useState(0.25);
  const [chartData, setChartData] = useState(generateChartData(0.25));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setLivePrice(prevPrice => {
        const change = (Math.random() - 0.5) * 0.02;
        const newPrice = prevPrice + change;
        if (newPrice > 0) {
            setChartData(prevData => [...prevData.slice(1), { price: newPrice }]);
            return newPrice;
        }
        return 0.01;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Eglife Ecosystem</h1>
        <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
          Explore the suite of tools and platforms that make up the Eglife universe. Each component is designed to add real-world utility to your tokens.
        </p>
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
                {component.title === "Trade EGLIFE" ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-2">
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                             {isClient ? <span className="text-2xl font-bold">${livePrice.toFixed(4)}</span> : <span className="text-2xl font-bold">$0.2500</span>}
                        </div>
                        <div className="h-10 w-24">
                           {isClient && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                      cursor={false}
                                      contentStyle={{ 
                                          backgroundColor: 'hsl(var(--background))', 
                                          border: '1px solid hsl(var(--border))',
                                          borderRadius: 'var(--radius)' 
                                        }}
                                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                                      labelFormatter={() => ''}
                                      formatter={(value:any) => [`$${Number(value).toFixed(4)}`, 'Price']}
                                    />
                                    <YAxis domain={['dataMin', 'dataMax']} hide />
                                    <Area type="monotone" dataKey="price" stroke="hsl(var(--accent))" fill="url(#chartGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                           )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button asChild className="flex-1">
                            <Link href={PANCAKESWAP_BUY_URL} target="_blank" rel="noopener noreferrer">Buy EGLIFE</Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                            <Link href={PANCAKESWAP_SELL_URL} target="_blank" rel="noopener noreferrer">Sell EGLIFE</Link>
                        </Button>
                    </div>
                  </div>
                ) : (
                  <Link href={component.link} className="text-sm font-medium text-accent hover:underline flex items-center mt-4">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
