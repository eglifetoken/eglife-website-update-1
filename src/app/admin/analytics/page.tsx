
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts";

const stakingDistributionData = [
    { tier: 'Starter', users: 450, fill: "hsl(var(--chart-1))" },
    { tier: 'Bronze', users: 320, fill: "hsl(var(--chart-2))" },
    { tier: 'Silver', users: 210, fill: "hsl(var(--chart-3))" },
    { tier: 'Gold', users: 150, fill: "hsl(var(--chart-4))" },
    { tier: 'Platinum', users: 80, fill: "hsl(var(--chart-5))" },
    { tier: 'Diamond', users: 44, fill: "hsl(var(--primary))"  },
];

const tokenStatusData = [
  { name: 'Staked', value: 65000000, fill: 'hsl(var(--chart-1))' },
  { name: 'In Wallets', value: 37000000, fill: 'hsl(var(--chart-2))' },
];

const revenueSourceData = [
    { source: "Staking Fees", revenue: 12500, fill: "hsl(var(--chart-1))" },
    { source: "EGPAY Fees", revenue: 8800, fill: "hsl(var(--chart-2))" },
    { source: "Unstake Penalty", revenue: 4050, fill: "hsl(var(--chart-3))" },
]

const stakingChartConfig = {
    users: {
      label: "Users",
      color: "hsl(var(--chart-1))",
    },
};

const tokenStatusChartConfig = {
    value: {
        label: "Tokens"
    },
    Staked: {
        label: "Staked",
        color: "hsl(var(--chart-1))"
    },
    "In Wallets": {
        label: "In Wallets",
        color: "hsl(var(--chart-2))"
    }
}

const revenueChartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))"
    }
};

export default function AdminAnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Platform Analytics</h1>
                <p className="text-muted-foreground">Deep dive into staking, user, and financial metrics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Staking Distribution by Tier</CardTitle>
                        <CardDescription>Number of users in each staking tier.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ChartContainer config={stakingChartConfig} className="w-full h-full">
                            <BarChart data={stakingDistributionData} layout="vertical" margin={{ left: 10, right: 10 }} accessibilityLayer>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="tier" 
                                    type="category" 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tickMargin={10} 
                                    width={60} 
                                />
                                <ChartTooltip 
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="users" radius={[0, 4, 4, 0]}>
                                     {stakingDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Staked vs. Circulating Supply</CardTitle>
                        <CardDescription>A comparison of staked tokens versus tokens held in user wallets.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] flex items-center justify-center">
                         <ChartContainer config={tokenStatusChartConfig} className="w-full h-full">
                            <PieChart accessibilityLayer>
                                <ChartTooltip 
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Pie 
                                    data={tokenStatusData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={120} 
                                    labelLine={false}
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                        return (
                                        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                        );
                                    }}
                                >
                                     {tokenStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                               <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Monthly Revenue by Source</CardTitle>
                        <CardDescription>Breakdown of platform revenue streams for the current month.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ChartContainer config={revenueChartConfig} className="w-full h-full">
                           <BarChart data={revenueSourceData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }} accessibilityLayer>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="source" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                               <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" formatter={(value) => `$${Number(value).toLocaleString()}`} />}
                                />
                                <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                                     {revenueSourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                           </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
