
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, TrendingUp, CheckCircle, Percent, PiggyBank, AlertTriangle } from "lucide-react";

const stakingTiers = [
    { name: "Starter", amount: "10 - 100 EGLIFE", apy: "12%" },
    { name: "Bronze", amount: "101 - 500 EGLIFE", apy: "18%" },
    { name: "Silver", amount: "501 - 1,000 EGLIFE", apy: "20%" },
    { name: "Gold", amount: "1,001 - 5,000 EGLIFE", apy: "22%" },
    { name: "Platinum", amount: "5,001 - 10,000 EGLIFE", apy: "24%" },
    { name: "Diamond", amount: "10,001 - 25,000 EGLIFE", apy: "26%" },
    { name: "Diamond Stake", amount: "25,001+ EGLIFE", apy: "30%" },
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
                {/* Staking Rewards */}
                <Card className="border-accent">
                    <CardHeader>
                         <div className="p-3 bg-accent/10 rounded-md w-fit mb-4">
                            <PiggyBank className="h-8 w-8 text-accent" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Staking Rewards (APY)</CardTitle>
                        <CardDescription className="text-lg">Earn a variable annual yield by staking your EGLIFE tokens. Higher tiers reward more.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Package</TableHead>
                                    <TableHead>Staking Amount</TableHead>
                                    <TableHead className="text-right">Annual Yield (APY)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stakingTiers.map((tier) => (
                                    <TableRow key={tier.name}>
                                        <TableCell className="font-medium">{tier.name}</TableCell>
                                        <TableCell>{tier.amount}</TableCell>
                                        <TableCell className="text-right font-semibold text-accent">{tier.apy}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <div className="mt-6 text-left bg-muted/50 p-4 rounded-lg space-y-2">
                             <p className="text-sm text-foreground/80"><strong className="text-accent">Lock Period:</strong> 365 Days. Principal is locked but rewards can be claimed any time.</p>
                             <p className="text-sm text-foreground/80"><strong className="text-accent">Early Unstake Penalty:</strong> A 5% penalty on principal is applied for unstaking before 365 days.</p>
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
                        <CardDescription className="text-lg">Grow your income by introducing new users. Earn a commission from their investment across 10 levels and beyond.</CardDescription>
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
                                 <TableRow className="border-t-2 border-primary/20">
                                    <TableCell className="font-medium">Royalty (Beyond Lvl 10)</TableCell>
                                    <TableCell className="text-right font-semibold text-primary">0.1%</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <p className="text-sm text-muted-foreground mt-4 text-center">Royalty is paid to unlimited depth on your entire referral network.</p>
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

            <div className="mt-16">
                <Card className="border-destructive/50">
                    <CardHeader className="flex-row items-center gap-4">
                         <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
                        <CardTitle className="font-headline text-2xl text-destructive">Disclaimer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                            <li>This plan is prepared for <strong>educational and informational purposes only</strong> and does not constitute financial or investment advice.</li>
                            <li>Actual returns, bonuses, and referral structures are <strong>subject to change</strong> by the company at any time without prior notice.</li>
                            <li>Participation in staking and referral programs involves <strong>risk</strong>, and users are advised to conduct their own research and seek professional advice before making any investment decisions.</li>
                            <li>The company reserves the right to <strong>modify, suspend, or terminate</strong> the plan in part or full to comply with legal, technical, or regulatory requirements.</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-6">Prepared for EGPAY / EGLIFE Token.</p>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
