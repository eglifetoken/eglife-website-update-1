
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Gift, Users, BarChart2, TrendingUp, CheckCircle, Percent } from "lucide-react";

const dailyProfitTiers = [
    { package: "Starter", amount: "$10 - $1,000" },
    { package: "Silver", amount: "$1,001 - $5,000" },
    { package: "Gold", amount: "$5,001 - $10,000" },
    { package: "Platinum", amount: "$10,001 - $25,000" },
    { package: "Diamond", amount: "$25,001 - $100,000" },
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
                    Discover the powerful earning opportunities within the EGLIFE ecosystem through our structured profit and referral income plans.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Daily Profit */}
                <Card className="border-accent">
                    <CardHeader>
                         <div className="p-3 bg-accent/10 rounded-md w-fit mb-4">
                            <TrendingUp className="h-8 w-8 text-accent" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Daily Profit</CardTitle>
                        <CardDescription className="text-lg">Earn a consistent daily return on your investment for a fixed period.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Package</TableHead>
                                    <TableHead>Amount (USD)</TableHead>
                                    <TableHead className="text-right">Daily Profit</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dailyProfitTiers.map((tier) => (
                                    <TableRow key={tier.package}>
                                        <TableCell className="font-medium">{tier.package}</TableCell>
                                        <TableCell>{tier.amount}</TableCell>
                                        <TableCell className="text-right font-semibold text-accent">1%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <div className="mt-6 text-center bg-muted/50 p-4 rounded-lg">
                            <p className="text-lg font-bold text-accent">1% Daily For 200 Days</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Level Income */}
                <Card className="border-primary">
                     <CardHeader>
                        <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                            <Users className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Level Income</CardTitle>
                        <CardDescription className="text-lg">Grow your income by introducing new users. Earn a commission from their investment across 10 levels.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Level</TableHead>
                                    <TableHead className="text-right">Commission</TableHead>
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
                                <span><strong>Eligibility:</strong> You must have an active investment to earn referral commissions.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                                <span><strong>Instant Payout:</strong> Commissions are paid instantly in EGLIFE when your referred user invests.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
