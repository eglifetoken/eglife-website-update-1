
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Trophy, Apple, Bot, Windows, Download } from "lucide-react";
import Link from 'next/link';
import { getTokenData, type TokenData } from '@/ai/flows/getTokenData';
import Image from 'next/image';


const popularCoins = [
  { name: "BTC", fullName: "Bitcoin", price: "92,400.45", change: "+2.44%", isUp: true },
  { name: "ETH", fullName: "Ethereum", price: "3,250.68", change: "+1.70%", isUp: true },
  { name: "BNB", fullName: "BNB", price: "887.07", change: "+2.33%", isUp: true },
  { name: "XRP", fullName: "XRP", price: "2.03", change: "+1.06%", isUp: true },
];

const newsItems = [
    { title: "Figure Submits Second IPO Application to SEC for Solana Blockchain Equity Issuance", link: "#" },
    { title: "Binance Market Update (2025-12-12)", link: "#" },
    { title: "BBVA Expands AI Collaboration with OpenAI to Enhance Global Operations", link: "#" },
    { title: "Venture Capital Shifts Focus in Crypto Investments", link: "#" },
]


export default function HomePage() {
    const [tokenData, setTokenData] = useState<TokenData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTokenData();
                setTokenData(data);
            } catch (error) {
                console.error("Failed to fetch token data:", error);
            }
        };
        fetchData();
    }, []);

    const isPriceUp = tokenData ? tokenData.priceChangePercentage24h >= 0 : true;

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 space-y-16">
            
            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-6xl md:text-8xl font-bold text-amber-400">300,563,486</h1>
                    <p className="text-4xl md:text-5xl font-bold mt-2">USERS TRUST US</p>
                    <p className="text-lg text-foreground/80 mt-4">The World's Leading Cryptocurrency Exchange</p>
                    <div className="flex justify-center lg:justify-start gap-8 mt-8">
                        <div className="flex items-center gap-2">
                            <Award className="h-8 w-8 text-amber-400" />
                            <div>
                                <p className="font-bold">No.1</p>
                                <p className="text-sm text-foreground/80">Customer Assets</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-2">
                            <Trophy className="h-8 w-8 text-amber-400" />
                             <div>
                                <p className="font-bold">No.1</p>
                                <p className="text-sm text-foreground/80">Trading Volume</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button size="lg" asChild>
                            <Link href="/register">Sign Up</Link>
                        </Button>
                        <p className="text-sm text-foreground/60 flex-shrink-0 self-center">Up to $100 Bonus Only Today</p>
                    </div>
                </div>

                {/* Right Side Cards */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-headline">Popular</CardTitle>
                            <Button variant="link" asChild><Link href="#">View All 250+ Coins</Link></Button>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableBody>
                                    {popularCoins.map(coin => (
                                        <TableRow key={coin.name}>
                                            <TableCell>
                                                <div className="font-bold">{coin.name}</div>
                                                <div className="text-xs text-foreground/60">{coin.fullName}</div>
                                            </TableCell>
                                            <TableCell className="font-mono text-right">${coin.price}</TableCell>
                                            <TableCell className={`font-semibold text-right ${coin.isUp ? 'text-green-500' : 'text-red-500'}`}>{coin.change}</TableCell>
                                        </TableRow>
                                    ))}
                                     {tokenData && (
                                         <TableRow>
                                            <TableCell>
                                                <div className="font-bold">EGLIFE</div>
                                                <div className="text-xs text-foreground/60">EGLIFE Token</div>
                                            </TableCell>
                                            <TableCell className="font-mono text-right">${tokenData.priceUsd.toFixed(4)}</TableCell>
                                            <TableCell className={`font-semibold text-right ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>{tokenData.priceChangePercentage24h.toFixed(2)}%</TableCell>
                                        </TableRow>
                                     )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                             <CardTitle className="font-headline">News</CardTitle>
                             <Button variant="link" asChild><Link href="#">View All News</Link></Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {newsItems.map((item, index) => (
                                <Link href={item.link} key={index} className="block text-foreground/80 hover:text-primary transition-colors">
                                    {item.title}
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </section>

             {/* SAFU Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
                 <div className="text-center lg:text-left">
                    <h2 className="text-5xl md:text-7xl font-bold">FUNDS ARE</h2>
                    <p className="text-5xl md:text-7xl font-bold text-amber-400">SAFU</p>
                    <p className="text-md text-foreground/80 mt-4 max-w-lg mx-auto lg:mx-0">
                        The EGLIFE Security Fund was established to protect your funds in rare emergencies. Your security is our priority.
                    </p>
                </div>
                 <div className="text-center lg:text-left space-y-8">
                     <div>
                        <p className="text-sm text-foreground/70">As of September 2025, the EGLIFE Security fund comprises a reserve of</p>
                        <p className="text-4xl font-bold text-amber-400 mt-1">10,000,000 EGLIFE</p>
                        <p className="font-mono text-xs text-foreground/50 mt-1">EGLIFE SAFU Wallet: 0x...a4D09113</p>
                    </div>
                     <div className="flex justify-center lg:justify-start gap-8">
                        <div>
                            <p className="text-3xl font-bold">7,488,223</p>
                            <p className="text-sm text-foreground/70">Users helped</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">$229,433,449</p>
                            <p className="text-sm text-foreground/70">Funds recovered</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Trade on the Go Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
                 <div className="flex justify-center">
                    <Image src="https://placehold.co/350x700/0F172A/FFF" alt="EGLIFE Mobile App" width={350} height={700} className="rounded-3xl shadow-2xl"/>
                 </div>
                 <div className="text-center lg:text-left">
                    <h2 className="text-5xl md:text-6xl font-bold">Trade on the go.</h2>
                    <p className="text-5xl md:text-6xl font-bold text-primary">Anywhere, anytime.</p>
                     <div className="mt-8 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                        <div className="space-y-4 text-center">
                            <div className="p-4 bg-card rounded-xl border inline-block">
                                <Image src="https://placehold.co/128x128/FFFFFF/000000?text=QR" alt="QR Code to download app" width={128} height={128} />
                            </div>
                            <p className="text-sm text-foreground/80">Scan to Download App</p>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Apple className="h-8 w-8 text-foreground" />
                                <span className="font-medium">iOS</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Bot className="h-8 w-8 text-foreground" />
                                <span className="font-medium">Android</span>
                            </div>
                             <div className="flex items-center gap-4">
                                <Windows className="h-8 w-8 text-foreground" />
                                <span className="font-medium">Windows</span>
                            </div>
                        </div>
                     </div>
                     <Button variant="link" className="mt-8" asChild>
                        <Link href="#">
                            More Download Options <Download className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                 </div>
            </section>
        </div>
    );
}
