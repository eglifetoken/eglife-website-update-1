"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Trophy, Apple, Bot, Monitor, Download, Aperture, GitMerge, Lightbulb, Search, UserCheck, ShieldCheck, MessageSquare, BookOpen, CheckCircle, ArrowRight, Rss, Globe } from "lucide-react";
import Link from 'next/link';
import { getTokenData, type TokenData } from '@/ai/flows/getTokenData';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const topGainers = [
    { name: "SOL", price: "180.15", change: "+15.2%", volume: "2.5B" },
    { name: "AVAX", price: "55.80", change: "+12.1%", volume: "1.2B" },
    { name: "MATIC", price: "1.05", change: "+9.8%", volume: "800M" },
];

const topLosers = [
    { name: "ADA", price: "0.62", change: "-5.4%", volume: "600M" },
    { name: "DOT", price: "9.50", change: "-4.1%", volume: "450M" },
    { name: "DOGE", price: "0.18", change: "-3.2%", volume: "1.5B" },
];

const whyTradeOptions = [
    { icon: Award, title: "Low Fees", description: "Enjoy competitive trading fees and further reductions with EGLIFE tokens." },
    { icon: ShieldCheck, title: "High Security", description: "Your assets are protected by industry-leading security measures." },
    { icon: UserCheck, title: "Expert Support", description: "Our 24/7 customer support is ready to assist you anytime." },
];

const startJourneySteps = [
    { number: 1, title: "Create an Account", description: "Register in minutes and complete our easy verification process.", buttonText: "Register Now" },
    { number: 2, title: "Fund Your Account", description: "Add funds using your favorite payment method, from UPI to bank transfers.", buttonText: "Fund" },
    { number: 3, title: "Start Trading", description: "You're all set. Buy, sell, and trade hundreds of cryptocurrencies.", buttonText: "Trade Now" },
];


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
            <section className="text-center py-16">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">Buy Bitcoin, Ethereum and <br/> 500+ cryptocurrencies</h1>
                <div className="mt-8 relative max-w-lg mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"/>
                    <input type="text" placeholder="Search for a crypto..." className="w-full h-14 pl-12 pr-4 rounded-full bg-muted border border-border focus:ring-primary focus:border-primary outline-none" />
                </div>
                 <div className="mt-6">
                    <Button size="lg" asChild>
                        <Link href="/register">Sign Up Now</Link>
                    </Button>
                </div>
            </section>

            {/* Market Movers */}
            <section>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <Card>
                        <CardHeader><CardTitle>🔥 Top Gainers</CardTitle></CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow><TableHead>Coin</TableHead><TableHead>Price</TableHead><TableHead>Change</TableHead><TableHead>Volume</TableHead></TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topGainers.map(coin => (
                                        <TableRow key={coin.name}>
                                            <TableCell>{coin.name}</TableCell>
                                            <TableCell>${coin.price}</TableCell>
                                            <TableCell className="text-green-500">{coin.change}</TableCell>
                                            <TableCell>{coin.volume}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                     </Card>
                     <Card>
                        <CardHeader><CardTitle>📉 Top Losers</CardTitle></CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow><TableHead>Coin</TableHead><TableHead>Price</TableHead><TableHead>Change</TableHead><TableHead>Volume</TableHead></TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topLosers.map(coin => (
                                        <TableRow key={coin.name}>
                                            <TableCell>{coin.name}</TableCell>
                                            <TableCell>${coin.price}</TableCell>
                                            <TableCell className="text-red-500">{coin.change}</TableCell>
                                            <TableCell>{coin.volume}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                     </Card>
                 </div>
            </section>

            {/* Why Trade on EGLIFE */}
            <section className="py-16">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Why trade on EGLIFE?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {whyTradeOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                             <Card key={index} className="text-center">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full w-fit mb-4">
                                        <Icon className="h-8 w-8 text-primary"/>
                                    </div>
                                    <CardTitle>{option.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{option.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </section>
            
            {/* Start Your Journey */}
            <section className="py-16">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Start your crypto journey in minutes</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                     <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border hidden md:block" />
                     {startJourneySteps.map((step, index) => (
                        <div key={index} className="text-center relative bg-background p-4 z-10">
                            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">{step.number}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground mb-4">{step.description}</p>
                            <Button variant="link">{step.buttonText} <ArrowRight className="ml-2 h-4 w-4"/></Button>
                        </div>
                    ))}
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
                                <Monitor className="h-8 w-8 text-foreground" />
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

             {/* Our Global Community */}
             <section className="py-16 text-center">
                 <Globe className="h-16 w-16 text-primary mx-auto mb-6"/>
                 <h2 className="text-4xl md:text-5xl font-bold font-headline">Our Global Community</h2>
                 <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Join a fast-growing community of traders and crypto enthusiasts from around the world.</p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
                     <div>
                        <p className="text-4xl font-bold text-primary">350M+</p>
                        <p>Users worldwide</p>
                     </div>
                      <div>
                        <p className="text-4xl font-bold text-primary">180+</p>
                        <p>Countries supported</p>
                     </div>
                      <div>
                        <p className="text-4xl font-bold text-primary">$76B</p>
                        <p>24h trading volume</p>
                     </div>
                     <div>
                        <p className="text-4xl font-bold text-primary">&lt;0.1%</p>
                        <p>Lowest trading fees</p>
                     </div>
                 </div>
             </section>

            {/* Need Help? Section */}
            <section className="py-16">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Need help?</h2>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <Card className="hover:bg-muted/50">
                        <CardHeader className="flex-row gap-4 items-center">
                            <MessageSquare className="h-8 w-8 text-primary"/>
                            <CardTitle>24/7 Chat Support</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Get timely support from our team anytime.</p>
                            <Button variant="link" className="p-0 mt-2">Chat Now</Button>
                        </CardContent>
                     </Card>
                      <Card className="hover:bg-muted/50">
                        <CardHeader className="flex-row gap-4 items-center">
                            <BookOpen className="h-8 w-8 text-primary"/>
                            <CardTitle>FAQs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Explore our frequently asked questions.</p>
                            <Button variant="link" className="p-0 mt-2">Learn More</Button>
                        </CardContent>
                     </Card>
                      <Card className="hover:bg-muted/50">
                        <CardHeader className="flex-row gap-4 items-center">
                            <Rss className="h-8 w-8 text-primary"/>
                            <CardTitle>Blog</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Stay up to date with our latest news.</p>
                            <Button variant="link" className="p-0 mt-2">Read Now</Button>
                        </CardContent>
                     </Card>
                </div>
            </section>
        </div>
    );
}