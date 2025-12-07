
"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, DollarSign, BarChart, Users, ShieldCheck, Zap } from "lucide-react";

const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const PANCAKESWAP_BUY_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;

const features = [
    { icon: DollarSign, title: "Spot & Futures Trading", description: "Trade a wide range of cryptocurrencies with advanced order types and deep liquidity." },
    { icon: BarChart, title: "Advanced Charting", description: "Utilize professional-grade charting tools to analyze market trends and make informed decisions." },
    { icon: Users, title: "P2P Marketplace", description: "Buy and sell crypto directly with other users using your preferred local payment methods." },
    { icon: ShieldCheck, title: "Secure Wallet", description: "Manage your crypto and INR funds in a secure, multi-currency wallet with robust safety features." },
    { icon: Zap, title: "Instant Payments", description: "Pay utility bills, recharge your mobile, and more using the integrated EGPAY system." },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-background">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center text-center px-4 overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
        <Image
          src="/background.png"
          alt="Abstract network background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold tracking-tighter mb-4 text-white leading-tight">
              EGPAYDCX
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-6">भारत का पहला Super Fintech-Crypto Hybrid Ecosystem</h2>
            <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-foreground/80 mb-8">
             यह एक One App – One Ecosystem है जहाँ user trading भी कर सकता है, recharge भी कर सकता है, Web3 wallet भी चला सकता है और Digital Rupee भी भेज सकता है।
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                <Button asChild size="lg" className="font-bold text-base w-full sm:w-auto flex-1">
                  <Link href="/home">Go to App</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto font-bold text-base flex-1">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-12 md:px-6 space-y-20">
        {/* Features Section */}
        <section>
             <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">A Complete Crypto Ecosystem</h2>
                <p className="text-lg text-foreground/80 mt-4">
                   From advanced trading tools to everyday utility payments, we provide everything you need in one powerful platform.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/20">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-md">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/80">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
                 <Card className="md:col-span-2 lg:col-span-3 bg-primary/10 border-primary text-center">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">And 15+ More Modules</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/80 max-w-2xl mx-auto">
                            Our platform is built on a massive foundation including a full-fledged NFT Marketplace, Staking Pools, a Launchpad for new projects, a Web3 Wallet, and comprehensive security features.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* Get Started Section */}
         <section className="text-center py-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                Join the EGLIFE ecosystem today. Create an account, explore the market, and become part of the new standard for financial freedom.
            </p>
            <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/home">
                        Launch App <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}
