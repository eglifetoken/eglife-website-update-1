
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiggyBank, Landmark, Wallet, HelpCircle, ChevronsRight, AlertTriangle } from "lucide-react"
import { StakingFAQ } from "@/components/staking-faq"

const stakingTiers = [
    { tier: 1, amount: "10 - 100", apy: "12%" },
    { tier: 2, amount: "101 - 500", apy: "18%" },
    { tier: 3, amount: "501 - 1,000", apy: "20%" },
    { tier: 4, amount: "1,001 - 5,000", apy: "22%" },
    { tier: 5, amount: "5,001 - 10,000", apy: "24%" },
    { tier: 6, amount: "10,001+", apy: "26%" },
];

export default function StakingPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">EGLIFE Staking</h1>
        <p className="text-lg text-foreground/80">Stake your EGLIFE tokens to earn competitive rewards and support the ecosystem's growth.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Your EGLIFE Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,530.00</div>
            <p className="text-xs text-muted-foreground">~$2,632.50 USD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Total Staked</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,000.00</div>
            <p className="text-xs text-muted-foreground">Locked for 365 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Total Rewards Earned</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152.75</div>
            <p className="text-xs text-muted-foreground">Claimable anytime (min 1 EGLIFE)</p>
          </CardContent>
        </Card>
         <Card className="bg-primary/5 border-primary">
          <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium font-headline text-primary">Ready to Earn?</CardTitle>
          </CardHeader>
          <CardContent>
             <Button className="w-full">Claim Rewards</Button>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Staking Tiers & APY</CardTitle>
                    <CardDescription>The more you stake, the higher your annual percentage yield (APY).</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
                        {stakingTiers.map(tier => (
                             <div key={tier.tier} className="p-4 rounded-lg bg-muted/50 border">
                                <p className="text-sm text-muted-foreground">Tier {tier.tier}</p>
                                <p className="font-bold text-lg text-primary">{tier.apy}</p>
                                <p className="text-xs text-muted-foreground">{tier.amount}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Core Staking Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground/80">
                    <div className="flex items-start gap-3">
                        <ChevronsRight className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-foreground">Lock Period: 365 Days</h4>
                            <p>Your principal staked amount is locked for one year to ensure network stability.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ChevronsRight className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                         <div>
                            <h4 className="font-semibold text-foreground">Rewards: Claim Anytime</h4>
                            <p>Your earned rewards are liquid and can be claimed at any time once you've accumulated at least 1 EGLIFE.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                         <div>
                            <h4 className="font-semibold text-foreground">Early Unstake Penalty: 5% + Forfeited Rewards</h4>
                            <p>If you unstake before the 365-day lock period ends, a 5% penalty will be applied to your principal, and you will lose any unclaimed rewards.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div>
            <Card>
                <Tabs defaultValue="stake" className="w-full">
                <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="stake">Stake</TabsTrigger>
                        <TabsTrigger value="unstake">Unstake</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <TabsContent value="stake">
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="stake-amount">Amount to Stake</Label>
                        <Input id="stake-amount" type="number" placeholder="Min 10 EGLIFE" />
                    </div>
                    <p className="text-sm text-muted-foreground">Your stake will be locked for 365 days. Rewards start accruing immediately.</p>
                    </CardContent>
                    <CardFooter>
                    <Button className="w-full">Stake Now</Button>
                    </CardFooter>
                </TabsContent>
                <TabsContent value="unstake">
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                        <Input id="unstake-amount" type="number" placeholder="0.00 EGLIFE" />
                    </div>
                    <p className="text-sm text-destructive">Warning: Early unstaking incurs a 5% penalty on your principal and forfeits unclaimed rewards.</p>
                    </CardContent>
                    <CardFooter>
                    <Button className="w-full" variant="destructive">Unstake Now</Button>
                    </CardFooter>
                </TabsContent>
                </Tabs>
            </Card>

            <Card className="mt-8">
                 <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <HelpCircle className="w-6 h-6 text-primary"/>
                    <CardTitle className="font-headline text-2xl">
                        Staking FAQ
                    </CardTitle>
                 </CardHeader>
                <CardContent>
                    <StakingFAQ />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
