"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiggyBank, Landmark, Wallet } from "lucide-react"

export default function StakingPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">EGLI Staking</h1>
      <p className="text-lg text-foreground/80 mb-8">Stake your EGLI tokens to earn rewards and support the ecosystem.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Your EGLI Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,530.00 EGLI</div>
            <p className="text-xs text-muted-foreground">~$2,106.00 USD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Total Staked</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,000.00 EGLI</div>
            <p className="text-xs text-muted-foreground">Currently earning rewards</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-headline">Estimated APY</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">Annual Percentage Yield</p>
          </CardContent>
        </Card>
      </div>

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
                <Input id="stake-amount" type="number" placeholder="0.00 EGLI" />
              </div>
              <p className="text-sm text-muted-foreground">Enter the amount of EGLI you wish to stake. Staked tokens will be locked and start earning rewards immediately.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Stake Now</Button>
            </CardFooter>
          </TabsContent>
          <TabsContent value="unstake">
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                <Input id="unstake-amount" type="number" placeholder="0.00 EGLI" />
              </div>
              <p className="text-sm text-muted-foreground">Enter the amount of EGLI you wish to unstake. Unstaking may require a cooldown period and will stop reward accrual.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Unstake Now</Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
