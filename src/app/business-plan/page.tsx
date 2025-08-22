
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Gift, Users, BarChart2, TrendingUp, CheckCircle } from "lucide-react";

const stakingTiers = [
    { tier: "Fixed Reward Staking", amount: "Any Amount", reward: "5%" },
];

const referralTiers = [
    { level: 1, bonus: "10%" },
    { level: 2, bonus: "5%" },
    { level: 3, bonus: "3%" },
    { level: 4, bonus: "2%" },
    { level: 5, bonus: "1%" },
    { level: 6, bonus: "1%" },
    { level: 7, bonus: "0.5%" },
    { level: 8, bonus: "0.5%" },
    { level: 9, bonus: "0.25%" },
    { level: 10, bonus: "0.25%" },
];

export default function BusinessPlanPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">EGLIFE Business Plan</h1>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                    Discover the powerful earning opportunities within the EGLIFE ecosystem through our structured working and non-working income plans.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Non-Working Income */}
                <Card className="border-accent">
                    <CardHeader>
                         <div className="p-3 bg-accent/10 rounded-md w-fit mb-4">
                            <TrendingUp className="h-8 w-8 text-accent" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Non-Working Income (Staking)</CardTitle>
                        <CardDescription className="text-lg">Earn a passive reward simply by holding and staking your EGLIFE tokens.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Package Name</TableHead>
                                    <TableHead>Staking Amount (EGLIFE)</TableHead>
                                    <TableHead className="text-right">Reward</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stakingTiers.map((tier) => (
                                    <TableRow key={tier.tier}>
                                        <TableCell className="font-medium">{tier.tier}</TableCell>
                                        <TableCell>{tier.amount}</TableCell>
                                        <TableCell className="text-right font-semibold text-accent">{tier.reward}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                           <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                                <span><strong>30-Day Lock:</strong> Principal is locked for 30 days to ensure stability.</span>
                            </li>
                             <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                                <span><strong>One-Time Reward:</strong> The 5% reward is calculated and paid when you unstake.</span>
                            </li>
                             <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                                <span><strong>No Early Unstake:</strong> You must wait the full 30 days to withdraw your tokens.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Working Income */}
                <Card className="border-primary">
                     <CardHeader>
                        <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                            <Users className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Working Income (Referral Program)</CardTitle>
                        <CardDescription className="text-lg">Actively grow your income by introducing new users to the EGLIFE staking platform. Earn a percentage of their staked amount across 10 levels.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Level</TableHead>
                                    <TableHead className="text-right">Bonus Percentage</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {referralTiers.map((tier) => (
                                    <TableRow key={tier.level}>
                                        <TableCell className="font-medium">Level {tier.level}</TableCell>
                                        <TableCell className="text-right font-semibold text-primary">{tier.bonus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <p className="text-sm text-muted-foreground mt-4 text-center">A royalty of 0.1% is paid for referrals beyond 10 levels.</p>
                         <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                                <span><strong>Eligibility:</strong> You must have an active stake to earn referral bonuses.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                                <span><strong>Instant Payout:</strong> Bonuses are paid instantly in EGLIFE when your referred user stakes.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
