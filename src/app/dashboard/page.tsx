
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { DollarSign, LineChart, PieChart, TrendingUp, TrendingDown } from "lucide-react"

export default function DashboardPage() {
  const [livePrice, setLivePrice] = useState(0.25);
  const [priceChange, setPriceChange] = useState(0.01);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setLivePrice(prevPrice => {
        const change = (Math.random() - 0.5) * 0.02;
        const newPrice = prevPrice + change;
        setPriceChange(newPrice - prevPrice);
        return newPrice > 0 ? newPrice : 0.01;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const PriceChangeIndicator = priceChange >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">EGLIFE Token Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Live Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isClient ? (
                <>
                    <div className="text-2xl font-bold">${livePrice.toFixed(4)}</div>
                    <div className={`text-xs flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <PriceChangeIndicator className="h-3 w-3 mr-1" />
                        <span>{priceChange.toFixed(4)} (${(priceChange / (livePrice - priceChange) * 100).toFixed(2)}%)</span>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-2xl font-bold">$0.2500</div>
                    <p className="text-xs text-muted-foreground">Loading...</p>
                </>
            )}
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Market Cap</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$25.5M</div>
            <p className="text-xs text-muted-foreground">Based on current price</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Volume (24h)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">+5.2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Circulating Supply</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">102M EGLIFE</div>
            <p className="text-xs text-muted-foreground">out of 1B total supply</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Live Price Chart</CardTitle>
          <CardDescription>Live EGLIFE/WBNB price chart from GeckoTerminal.</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] p-0">
            <iframe
                height="100%"
                width="100%"
                id="geckoterminal-embed"
                title="GeckoTerminal Embed"
                src="https://www.geckoterminal.com/bsc/pools/0x5b66393526f7c9e04863e46114134b823e9a460a?embed=1&info=0&swaps=0"
                frameBorder="0"
                allow="clipboard-write"
                allowFullScreen
            ></iframe>
        </CardContent>
      </Card>
    </div>
  )
}
