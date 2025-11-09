
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
              Creative of <span className="text-primary">EGLIFE TOKEN</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
             EGLIFE TOKEN empowers global traders with secure, fast, and decentralized digital finance—driving innovation, growth, and trust worldwide.
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
                <Link href={PANCAKESWAP_BUY_URL} target="_blank" rel="noopener noreferrer">Buy Coins</Link>
              </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
