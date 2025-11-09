
"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Landmark, Briefcase, Award } from "lucide-react";
import Image from "next/image";

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
    icon: Award,
    title: "LP Lock Certificate",
    description: "View your staking certificate of achievement for supporting the ecosystem.",
    link: "/certificate",
    aiHint: "certificate award"
  },
];


const EGLIFE_CONTRACT_ADDRESS = "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113";
const PANCAKESWAP_BUY_URL = `https://pancakeswap.finance/swap?outputCurrency=${EGLIFE_CONTRACT_ADDRESS}`;

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[calc(100vh-5rem)] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-background/80 z-10" />
        <Image
          src="/background.png"
          alt="Abstract network background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex flex-col items-center">
             <div className="mb-6">
                <Image src="/icon-192x192.png" alt="EGLIFE Logo" width={128} height={128} className="rounded-full border-4 border-primary/50 shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter mb-4 text-white">
              Creative of <span className="text-primary">EGLIFE</span> TOKEN
            </h1>
            <p className="max-w-xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
              EGLIFE TOKEN empowers global traders with secure, fast, and decentralized digital finance—driving innovation, growth, and trust worldwide.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <Button asChild size="lg" className="font-bold text-base">
                <Link href="/dapp">Login</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold text-base border-primary text-primary hover:bg-primary/10 hover:text-primary">
                <Link href="/register">Registration</Link>
              </Button>
               <Button asChild size="lg" className="col-span-2 font-bold text-base">
                <Link href={PANCAKESWAP_BUY_URL} target="_blank" rel="noopener noreferrer">Buy Coins</Link>
              </Button>
            </div>
        </div>
      </section>

       <section className="w-full py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Ecosystem</h2>
                <p className="text-lg text-foreground/80 mt-2 max-w-3xl mx-auto">
                    Explore the suite of tools and platforms that make up the Eglife universe, designed to add real-world utility to your tokens.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {ecosystemComponents.map((component) => {
                const Icon = component.icon;
                return (
                    <div key={component.title} className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-card transition-colors">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <Icon className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-2">{component.title}</h3>
                        <p className="text-foreground/70 mb-4 flex-grow">{component.description}</p>
                        <Button asChild variant="link" className="text-primary">
                            <Link href={component.link}>Explore &rarr;</Link>
                        </Button>
                    </div>
                );
                })}
            </div>
        </div>
      </section>
    </div>
  );
}
