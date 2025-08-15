"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useState, useEffect } from "react"

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

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Dashboard</h1>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Live Token Price</CardTitle>
            <CardDescription>Real-time price of Eglife Token (EGLIFE)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold">${livePrice.toFixed(4)}</span>
              <span className={`text-2xl font-semibold ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(4)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleTimeString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Price History</CardTitle>
            <CardDescription>Historical price data for EGLIFE</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={chartData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(5)} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['dataMin - 0.05', 'dataMax + 0.05']} tickFormatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Tooltip cursor={{ fill: 'hsl(var(--background))', opacity: 0.5 }} content={<ChartTooltipContent indicator="line" />} />
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
    </div>
  )
}
