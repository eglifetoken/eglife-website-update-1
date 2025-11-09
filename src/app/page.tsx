
"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, CheckCircle, GitCommit, Gift, HandCoins, Landmark, LineChart, PiggyBank, Users } from "lucide-react";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const PANCAKESWAP_BUY_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;

const stakingTiers = [
    { level: "LV 1", range: "50 – 499", yearly: "100%" },
    { level: "LV 2", range: "500 – 1,999", yearly: "125%" },
    { level: "LV 3", range: "2,000 – 4,999", yearly: "150%" },
    { level: "LV 4", range: "5,000 – 9,999", yearly: "175%" },
    { level: "LV 5", range: "10,000 – 29,999", yearly: "200%" },
    { level: "LV 6", range: "30,000 – 50,000", yearly: "250%" },
];

const teamIncomeTiers = [
    { level: "LV 2", groupA: "10%", groupB: "2%", groupC: "0.50%" },
    { level: "LV 3", groupA: "12%", groupB: "3%", groupC: "1.00%" },
    { level: "LV 4", groupA: "14%", groupB: "4%", groupC: "1.50%" },
    { level: "LV 5", groupA: "16%", groupB: "5%", groupC: "2.00%" },
    { level: "LV 6", groupA: "18%", groupB: "6%", groupC: "2.50%" },
];


export default function Home() {
  return (
    <div className="flex flex-col items-center bg-background">
      {/* Hero Section */}
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
            <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter mb-4 text-white leading-tight">
              Redefining Utility, Empowering Lives.
            </h1>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-6">EGLIFE TOKEN</h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
             Welcome to the future of decentralized finance. EGLIFE is a revolutionary BEP-20 utility token on the BNB Smart Chain, meticulously engineered to bridge the gap between digital assets and real-world application. Join a global community building the new standard for financial freedom. Now trading on PancakeSwap.
            </p>
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button asChild size="lg" className="font-bold text-base">
                  <Link href="/dapp">Login</Link>
                </Button>
                <Button asChild size="lg" className="font-bold text-base">
                  <Link href="/register">Registration</Link>
                </Button>
              </div>
               <Button asChild size="lg" variant="secondary" className="w-full font-bold text-base">
                <Link href={PANCAKESWAP_BUY_URL} target="_blank" rel="noopener noreferrer">Buy Coins</Link>
              </Button>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:px-6 md:py-24 space-y-16">
        {/* About Section */}
        <section>
             <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">What is EGLIFE?</h2>
                <p className="text-lg text-foreground/80 mt-4">
                   The EGLIFE Token is a BEP-20 cryptocurrency on the BNB Smart Chain, designed to solve a core problem in the digital world: the lack of real-world use for crypto. By building an on-chain economy, EGLIFE moves beyond speculation and becomes a tool for daily finance, enabling seamless utility payments and rewarding its community.
                </p>
            </div>
        </section>

        {/* Staking Rewards Section */}
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Staking & Rewards</h2>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                    Stake your EGLIFE tokens to earn a powerful, passive yield. Higher staking levels unlock greater yearly returns, rewarding our most committed community members.
                </p>
            </div>
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-3"><PiggyBank className="h-7 w-7 text-primary"/> Staking Tiers & APY</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Level</TableHead>
                                <TableHead>Stake Range (EGLIFE)</TableHead>
                                <TableHead className="text-right">Yearly Income (APY)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stakingTiers.map((tier) => (
                                <TableRow key={tier.level}>
                                    <TableCell className="font-medium">{tier.level}</TableCell>
                                    <TableCell>{tier.range}</TableCell>
                                    <TableCell className="text-right font-semibold text-accent">{tier.yearly}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-6 text-left bg-muted/50 p-4 rounded-lg space-y-2">
                        <p className="text-sm text-foreground/80"><strong className="text-accent">Lock Period:</strong> 365 Days per deposit. Principal is locked but earnings accrue per-second and can be claimed anytime.</p>
                        <p className="text-sm text-foreground/80"><strong className="text-accent">Note:</strong> Staking is in EGLIFE and staking bonus is paid in EGLIFE only.</p>
                   </div>
                </CardContent>
            </Card>
        </section>

         {/* Referral & Team Income Section */}
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Referral & Team Income</h2>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                   Build your network and earn rewards. Our program is designed to incentivize community growth through direct bonuses and team-based income.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-3"><Gift className="h-7 w-7 text-primary"/>One-Time Referral Bonus</CardTitle>
                         <CardDescription>Earn an instant bonus for every new user you directly sponsor.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="p-4 rounded-lg border bg-muted/50 text-center">
                            <p className="text-sm text-muted-foreground">On Successful Purchase</p>
                            <p className="text-2xl font-bold">10 EGLIFE</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-muted/50 text-center">
                            <p className="text-sm text-muted-foreground">On Successful Staking</p>
                            <p className="text-2xl font-bold">10 EGLIFE</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-3"><Users className="h-7 w-7 text-primary"/>Team Income</CardTitle>
                        <CardDescription>Earn a percentage of the staking rewards generated by your downline team across three levels.</CardDescription>
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
                                        <TableCell>{tier.groupB}</TableCell>
                                        <TableCell>{tier.groupC}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* Tokenomics Section */}
        <section>
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Tokenomics</h2>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                   A fixed total supply of 1,000,000,000 EGLIFE is strategically distributed to ensure a balanced, sustainable, and community-focused ecosystem.
                </p>
            </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <Card className="p-6">
                    <HandCoins className="h-10 w-10 mx-auto text-primary mb-3"/>
                    <p className="text-2xl font-bold">30%</p>
                    <p className="text-muted-foreground">Ecosystem & Development</p>
                </Card>
                 <Card className="p-6">
                    <LineChart className="h-10 w-10 mx-auto text-primary mb-3"/>
                    <p className="text-2xl font-bold">20%</p>
                    <p className="text-muted-foreground">Liquidity Pool</p>
                </Card>
                 <Card className="p-6">
                    <Landmark className="h-10 w-10 mx-auto text-primary mb-3"/>
                    <p className="text-2xl font-bold">20%</p>
                    <p className="text-muted-foreground">Staking Rewards</p>
                </Card>
                 <Card className="p-6">
                    <Gift className="h-10 w-10 mx-auto text-primary mb-3"/>
                    <p className="text-2xl font-bold">10%</p>
                    <p className="text-muted-foreground">Public Airdrop</p>
                </Card>
                 <Card className="p-6">
                    <Users className="h-10 w-10 mx-auto text-primary mb-3"/>
                    <p className="text-2xl font-bold">10%</p>
                    <p className="text-muted-foreground">Team & Advisors</p>
                </Card>
                 <Card className="p-6">
                    <GitCommit className="h-10 w-10 mx-auto text-primary mb-3"/>
                    <p className="text-2xl font-bold">10%</p>
                    <p className="text-muted-foreground">Burn & Reserve</p>
                </Card>
            </div>
        </section>

        {/* Get Started Section */}
         <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                Join the EGLIFE ecosystem today. Connect your wallet, stake your tokens, and become part of the new standard for financial freedom.
            </p>
            <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/dapp">
                        Go to DApp <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}
