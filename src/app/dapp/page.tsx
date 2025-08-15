

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, Landmark, ShoppingCart, Users, Vote, Wallet } from "lucide-react";
import Link from "next/link";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const PANCAKESWAP_BUY_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;
const PANCAKESWAP_SELL_URL = `https://pancakeswap.finance/swap?inputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;


const ecosystemComponents = [
  {
    icon: Wallet,
    title: "Trade EGLIFE",
    description: "The central hub for managing your EGLIFE tokens and interacting with the ecosystem.",
    link: "/dashboard",
    status: "Live",
    statusVariant: "default",
    aiHint: "digital wallet"
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
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                     <Button asChild className="flex-1">
                        <Link href={PANCAKESWAP_BUY_URL} target="_blank" rel="noopener noreferrer">Buy EGLIFE</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                        <Link href={PANCAKESWAP_SELL_URL} target="_blank" rel="noopener noreferrer">Sell EGLIFE</Link>
                    </Button>
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
