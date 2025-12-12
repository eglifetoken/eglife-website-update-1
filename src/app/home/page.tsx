
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight, DollarSign, BarChart, ShoppingCart, Banknote, Repeat, TrendingUp, TrendingDown, Bell } from "lucide-react";
import Link from 'next/link';
import { getTokenData, type TokenData } from '@/ai/flows/getTokenData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Function to generate chart data based on live price
const generateChartData = (price: number, change: number) => {
    const data = [];
    // Calculate the starting price 30 days ago based on the 24h change
    let currentPrice = price / (1 + (change / 100));

    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        // Add some random volatility for a more realistic look
        currentPrice *= 1 + (Math.random() - 0.48) / 10;
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: parseFloat(currentPrice.toFixed(5)),
        });
    }
    // Ensure the last point matches the actual current price
    data[data.length - 1].price = parseFloat(price.toFixed(5));
    return data;
};


const mockMarketData = [
  { pair: "EGLIFE/USDT", price: 0.025, change: 2.3, isUp: true },
  { pair: "BTC/USDT", price: 65000, change: -1.2, isUp: false },
  { pair: "ETH/USDT", price: 3500, change: 0.5, isUp: true },
];

const mockGainers = [
  { pair: "SOL/USDT", price: 150, change: 8.5 },
  { pair: "AVAX/USDT", price: 35, change: 6.2 },
  { pair: "DOGE/USDT", price: 0.15, change: 5.1 },
];

const mockLosers = [
  { pair: "ADA/USDT", price: 0.45, change: -4.2 },
  { pair: "XRP/USDT", price: 0.5, change: -3.1 },
  { pair: "MATIC/USDT", price: 0.7, change: -2.8 },
];


export default function HomePage() {
    const [tokenData, setTokenData] = useState<TokenData | null>(null);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTokenData();
                setTokenData(data);
                const generatedData = generateChartData(data.priceUsd, data.priceChangePercentage24h);
                setChartData(generatedData);
            } catch (error) {
                console.error("Failed to fetch token data:", error);
            }
        };
        fetchData();
    }, []);

    const isPriceUp = tokenData ? tokenData.priceChangePercentage24h >= 0 : true;

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold">Home Dashboard</h1>
                    <p className="text-lg text-foreground/80">Welcome back, User!</p>
                </div>
                <Button variant="ghost" size="icon">
                    <Bell className="h-6 w-6" />
                </Button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Chart & Actions */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="font-headline text-2xl">EGLIFE/USDT</CardTitle>
                                    <CardDescription>BNB Smart Chain</CardDescription>
                                </div>
                                <div className={`flex items-center text-lg font-semibold ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
                                    {isPriceUp ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                                    {tokenData?.priceChangePercentage24h.toFixed(2)}%
                                </div>
                            </div>
                            <div className="text-4xl font-bold pt-4">
                                ${tokenData?.priceUsd.toFixed(4)}
                            </div>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={isPriceUp ? "hsl(var(--primary))" : "#ef4444"} stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor={isPriceUp ? "hsl(var(--primary))" : "#ef4444"} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} domain={['dataMin', 'dataMax']} tickFormatter={(value) => `$${Number(value).toFixed(5)}`} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderColor: 'hsl(var(--border))',
                                        }}
                                        formatter={(value: number) => [`$${value.toFixed(5)}`, 'Price']}
                                    />
                                    <Area type="monotone" dataKey="price" stroke={isPriceUp ? "hsl(var(--primary))" : "#ef4444"} fill="url(#colorPrice)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="text-center">
                            <CardHeader className="p-4"><CardTitle className="text-sm font-medium">Market Cap</CardTitle></CardHeader>
                            <CardContent className="p-4 pt-0"><p className="text-lg font-bold">${( (tokenData?.marketCapUsd ?? 0) / 1_000_000).toFixed(2)}M</p></CardContent>
                        </Card>
                        <Card className="text-center">
                             <CardHeader className="p-4"><CardTitle className="text-sm font-medium">Volume (24h)</CardTitle></CardHeader>
                            <CardContent className="p-4 pt-0"><p className="text-lg font-bold">${( (tokenData?.volume24hUsd ?? 0) / 1_000).toFixed(1)}K</p></CardContent>
                        </Card>
                        <Card className="text-center">
                             <CardHeader className="p-4"><CardTitle className="text-sm font-medium">Circ. Supply</CardTitle></CardHeader>
                            <CardContent className="p-4 pt-0"><p className="text-lg font-bold">{((tokenData?.circulatingSupply ?? 0) / 1_000_000).toFixed(2)}M</p></CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader className="p-4"><CardTitle className="text-sm font-medium">Total Supply</CardTitle></CardHeader>
                            <CardContent className="p-4 pt-0"><p className="text-lg font-bold">1B</p></CardContent>
                        </Card>
                    </div>

                </div>

                {/* Right Column - Quick Actions */}
                <div className="space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <Button asChild size="lg" className="h-auto py-3 flex flex-col gap-1">
                                <Link href="/buy-with-upi">
                                <ShoppingCart className="h-6 w-6" />
                                <span>Buy</span>
                                </Link>
                            </Button>
                             <Button asChild size="lg" variant="secondary" className="h-auto py-3 flex flex-col gap-1">
                                <Link href="/p2p">
                                <DollarSign className="h-6 w-6" />
                                <span>Sell</span>
                                </Link>
                            </Button>
                             <Button asChild size="lg" variant="secondary" className="h-auto py-3 flex flex-col gap-1">
                                <Link href="/staking">
                                <Banknote className="h-6 w-6" />
                                <span>Stake</span>
                                </Link>
                             </Button>
                             <Button asChild size="lg" variant="secondary" className="h-auto py-3 flex flex-col gap-1">
                                <Link href="/services">
                                <Repeat className="h-6 w-6" />
                                <span>Pay Bills</span>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Market (Example)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pair</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Change</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockMarketData.map(item => (
                                        <TableRow key={item.pair}>
                                            <TableCell>{item.pair}</TableCell>
                                            <TableCell>${item.price.toLocaleString()}</TableCell>
                                            <TableCell className={`text-right ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>{item.change.toFixed(1)}%</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom Row - Gainers & Losers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-md">
                            <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl">Top Gainers (Example)</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow><TableHead>Pair</TableHead><TableHead>Price</TableHead><TableHead className="text-right">Change</TableHead></TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockGainers.map(item => (
                                     <TableRow key={item.pair}>
                                        <TableCell>{item.pair}</TableCell>
                                        <TableCell>${item.price.toLocaleString()}</TableCell>
                                        <TableCell className="text-right text-green-500">+{item.change.toFixed(1)}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-destructive/10 rounded-md">
                            <TrendingDown className="h-6 w-6 text-destructive" />
                        </div>
                        <CardTitle className="font-headline text-2xl">Top Losers (Example)</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow><TableHead>Pair</TableHead><TableHead>Price</TableHead><TableHead className="text-right">Change</TableHead></TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockLosers.map(item => (
                                     <TableRow key={item.pair}>
                                        <TableCell>{item.pair}</TableCell>
                                        <TableCell>${item.price.toLocaleString()}</TableCell>
                                        <TableCell className="text-right text-red-500">{item.change.toFixed(1)}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}

    