
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, TrendingUp, CheckCircle, Percent, PiggyBank, AlertTriangle, Gift, ArrowUp, UserCheck, ShieldCheck } from "lucide-react";

const stakingTiers = [
    { level: "LV 1", range: "50 – 499", daily: "0.27%", monthly: "8.33%", yearly: "100%" },
    { level: "LV 2", range: "500 – 1,999", daily: "0.34%", monthly: "10.42%", yearly: "125%" },
    { level: "LV 3", range: "2,000 – 4,999", daily: "0.41%", monthly: "12.50%", yearly: "150%" },
    { level: "LV 4", range: "5,000 – 9,999", daily: "0.48%", monthly: "14.58%", yearly: "175%" },
    { level: "LV 5", range: "10,000 – 29,999", daily: "0.55%", monthly: "16.67%", yearly: "200%" },
    { level: "LV 6", range: "30,000 – 50,000", daily: "0.68%", monthly: "20.83%", yearly: "250%" },
];

const teamIncomeTiers = [
    { level: "LV 2", groupA: "10%", groupB: "2%", groupC: "0.50%" },
    { level: "LV 3", groupA: "12%", groupB: "3%", groupC: "1.00%" },
    { level: "LV 4", groupA: "14%", groupB: "4%", groupC: "1.50%" },
    { level: "LV 5", groupA: "16%", groupB: "5%", groupC: "2.00%" },
    { level: "LV 6", groupA: "18%", groupB: "6%", groupC: "2.50%" },
];

const levelUpgradeRules = [
    { from: "LV0", to: "LV1", selfStaking: "50 – 499", groupA: 0, groupBC: 0, total: 0 },
    { from: "LV1", to: "LV2", selfStaking: "500 – 1,999", groupA: 3, groupBC: 5, total: 8 },
    { from: "LV2", to: "LV3", selfStaking: "2,000 – 4,999", groupA: 6, groupBC: 20, total: 26 },
    { from: "LV3", to: "LV4", selfStaking: "5,000 – 9,999", groupA: 15, groupBC: 35, total: 50 },
    { from: "LV4", to: "LV5", selfStaking: "10,000 – 29,999", groupA: 25, groupBC: 70, total: 95 },
    { from: "LV5", to: "LV6", selfStaking: "30,000 – 50,000", groupA: 35, groupBC: 180, total: 215 },
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

            <div className="space-y-12">
                
                {/* Staking Rewards */}
                <Card className="border-accent">
                    <CardHeader>
                         <div className="p-3 bg-accent/10 rounded-md w-fit mb-4">
                            <PiggyBank className="h-8 w-8 text-accent" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Staking Rewards</CardTitle>
                        <CardDescription className="text-lg">Earn a powerful yield by staking your EGLIFE tokens. Higher levels unlock greater returns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Stake Range (EGLIFE)</TableHead>
                                    <TableHead>Daily</TableHead>
                                    <TableHead>Monthly</TableHead>
                                    <TableHead className="text-right">Yearly Income</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stakingTiers.map((tier) => (
                                    <TableRow key={tier.level}>
                                        <TableCell className="font-medium">{tier.level}</TableCell>
                                        <TableCell>{tier.range}</TableCell>
                                        <TableCell>{tier.daily}</TableCell>
                                        <TableCell>{tier.monthly}</TableCell>
                                        <TableCell className="text-right font-semibold text-accent">{tier.yearly}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <div className="mt-6 text-left bg-muted/50 p-4 rounded-lg space-y-2">
                             <p className="text-sm text-foreground/80"><strong className="text-accent">Lock Period:</strong> 365 Days per deposit. Principal is locked but earnings accrue per-second and can be claimed anytime.</p>
                             <p className="text-sm text-foreground/80"><strong className="text-accent">Note:</strong> Staking is in EGLIFE and staking bonus is paid in EGLIFE only.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Referral & Team Income */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <Card>
                        <CardHeader>
                            <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                                <Gift className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-3xl">One-Time Referral Bonus</CardTitle>
                             <CardDescription className="text-lg">Earn an instant bonus for every new user you directly sponsor.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="p-4 rounded-lg border bg-muted/50 text-center">
                                <p className="text-sm text-muted-foreground">On Successful Purchase</p>
                                <p className="text-2xl font-bold">10 EGLIFE</p>
                            </div>
                            <div className="p-4 rounded-lg border bg-muted/50 text-center">
                                <p className="text-sm text-muted-foreground">On Successful Staking</p>
                                <p className="text-2xl font-bold">10 EGLIFE</p>
                            </div>
                            <p className="text-sm text-muted-foreground pt-4"><strong className="text-primary">Note:</strong> This referral bonus is a one-time reward paid only to the Direct Sponsor for each new referee.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-3xl">Team Income</CardTitle>
                            <CardDescription className="text-lg">Earn a percentage of the staking rewards generated by your downline team.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Your Level</TableHead>
                                        <TableHead>Group A</TableHead>
                                        <TableHead>Group B</TableHead>
                                        <TableHead>Group C</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teamIncomeTiers.map((tier) => (
                                        <TableRow key={tier.level}>
                                            <TableCell className="font-medium">{tier.level}</TableCell>
                                            <TableCell className="font-semibold text-primary">{tier.groupA}</TableCell>
                                            <TableCell className="font-semibold text-primary/80">{tier.groupB}</TableCell>
                                            <TableCell className="font-semibold text-primary/60">{tier.groupC}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                             <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                                <li><strong>Group A:</strong> Your direct referrals (depth-1).</li>
                                <li><strong>Group B:</strong> Your second-level referrals (depth-2).</li>
                                <li><strong>Group C:</strong> Your third-level referrals (depth-3).</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Level Upgrade Rules */}
                <Card>
                    <CardHeader>
                        <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                            <ArrowUp className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-3xl">Level Upgrade Rules</CardTitle>
                        <CardDescription className="text-lg">Advance through the levels by meeting self-staking and team member requirements.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Upgrade</TableHead>
                                    <TableHead>Self-Staking (EGLIFE)</TableHead>
                                    <TableHead>Group A (Directs)</TableHead>
                                    <TableHead>Group B + C (Combined)</TableHead>
                                    <TableHead>Total Members</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {levelUpgradeRules.map((rule) => (
                                    <TableRow key={rule.from}>
                                        <TableCell className="font-medium">{rule.from} &rarr; {rule.to}</TableCell>
                                        <TableCell>{rule.selfStaking}</TableCell>
                                        <TableCell>{rule.groupA}</TableCell>
                                        <TableCell>{rule.groupBC}</TableCell>
                                        <TableCell>{rule.total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
