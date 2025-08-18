
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Users, Award, Pencil } from "lucide-react";

const stakingTiers = [
    { tier: "Starter Stake", amount: "10 - 100", apy: "12%" },
    { tier: "Bronze Stake", amount: "101 - 500", apy: "18%" },
    { tier: "Silver Stake", amount: "501 - 1,000", apy: "20%" },
    { tier: "Gold Stake", amount: "1,001 - 5,000", apy: "22%" },
    { tier: "Platinum Stake", amount: "5,001 - 10,000", apy: "24%" },
    { tier: "Diamond Stake", amount: "10,001+", apy: "26%" },
];

const recentActivity = [
    { user: "Alex Johnson", type: "Stake", amount: "500 EGLIFE", date: "2024-07-28 10:30 AM" },
    { user: "Samantha Carter", type: "Unstake", amount: "150 EGLIFE", date: "2024-07-28 09:15 AM" },
    { user: "Ben Richards", type: "Stake", amount: "10,000 EGLIFE", date: "2024-07-27 05:00 PM" },
    { user: "Marcus Rivera", type: "Claim Rewards", amount: "25.5 EGLIFE", date: "2024-07-27 01:20 PM" },
    { user: "Olivia Chen", type: "Stake", amount: "1,200 EGLIFE", date: "2024-07-26 11:00 AM" },
];

const activityBadgeVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Stake: "secondary",
  Unstake: "destructive",
  "Claim Rewards": "default",
};

export default function AdminStakingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Staking Management</h1>
                <p className="text-muted-foreground">Monitor and manage staking pools, rewards, and user activity.</p>
            </div>

             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Value Locked (TVL)</CardTitle>
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">65M EGLIFE</div>
                        <p className="text-xs text-muted-foreground">~$1.62M at current price</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Stakers</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">852</div>
                        <p className="text-xs text-muted-foreground">+15 since yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Rewards Distributed</CardTitle>
                        <Award className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.2M EGLIFE</div>
                        <p className="text-xs text-muted-foreground">All-time rewards paid out</p>
                    </CardContent>
                </Card>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Staking Tiers & APY</CardTitle>
                        <CardDescription>Manage the annual percentage yield and token amounts for each staking tier.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Package Name</TableHead>
                                    <TableHead>Staking Amount (EGLIFE)</TableHead>
                                    <TableHead>Current APY</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stakingTiers.map(tier => (
                                    <TableRow key={tier.tier}>
                                        <TableCell className="font-medium">{tier.tier}</TableCell>
                                        <TableCell>{tier.amount}</TableCell>
                                        <TableCell className="font-semibold text-primary">{tier.apy}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>A log of the latest staking-related actions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="flex-1">
                                        <p className="font-medium">{activity.user}</p>
                                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant={activityBadgeVariant[activity.type]}>{activity.type}</Badge>
                                        <p className="text-sm font-semibold">{activity.amount}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
