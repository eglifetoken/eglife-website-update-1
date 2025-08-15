"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { DollarSign, LineChart, PieChart, TrendingUp, TrendingDown } from "lucide-react"

const chartData = [
  { date: "2024-05-01", price: 0.12 },
  { date: "2024-05-02", price: 0.13 },
  { date: "2024-05-03", price: 0.15 },
  { date: "2024-05-04", price: 0.14 },
  { date: "2024-05-05", price: 0.16 },
  { date: "2024-05-06", price: 0.18 },
  { date: "2024-05-07", price: 0.17 },
  { date: "2024-05-08", price: 0.19 },
  { date: "2024-05-09", price: 0.22 },
  { date: "2024-05-10", price: 0.21 },
  { date: "2024-05-11", price: 0.23 },
  { date: "2024-05-12", price: 0.25 },
];

const chartConfig = {
  price: {
    label: "Price (USD)",
    color: "hsl(var(--accent))",
  },
}

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

  if (!isClient) {
    return null;
  }
  
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
            <div className="text-2xl font-bold">${livePrice.toFixed(4)}</div>
             <div className={`text-xs flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <PriceChangeIndicator className="h-3 w-3 mr-1" />
                <span>{priceChange.toFixed(4)} (${(priceChange / (livePrice - priceChange) * 100).toFixed(2)}%)</span>
            </div>
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
          <CardTitle className="font-headline">Price History (USD)</CardTitle>
          <CardDescription>Historical price data for EGLIFE over the last 12 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <AreaChart data={chartData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(5)} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['dataMin - 0.05', 'dataMax + 0.05']} tickFormatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Tooltip cursor={{ fill: 'hsl(var(--background))', opacity: 0.5 }} content={<ChartTooltipContent indicator="line" labelFormatter={(label, payload) => payload?.[0]?.payload.date} />} />
              <defs>
                  <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                  </linearGradient>
              </defs>
              <Area dataKey="price" type="monotone" fill="url(#fillPrice)" stroke="hsl(var(--accent))" stackId="a" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
