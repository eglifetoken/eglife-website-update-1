
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Smartphone, Globe, Lightbulb, Droplets, Flame, Wifi, Tv, School, Building, HandCoins, QrCode, Wallet, Banknote, IndianRupee, User, Landmark as BankIcon, History, Store, Network, ShieldCheck, Ticket, Plane, ShoppingCart, Fuel, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mobileRecharge } from "@/ai/flows/recharge";
import { getRechargePlans, RechargePlan } from "@/ai/flows/getRechargePlans";
import { RechargePlansDialog } from "@/components/recharge-plans-dialog";


const services = [
  {
    icon: Smartphone,
    title: "Mobile Recharge",
    description: "Instantly top-up your prepaid mobile plan or pay your postpaid bill.",
    aiHint: "mobile phone"
  },
  {
    icon: Lightbulb,
    title: "Electricity Bill",
    description: "Pay your electricity bills from various providers across the country.",
    aiHint: "lightbulb idea"
  },
  {
    icon: Droplets,
    title: "Water Bill",
    description: "Settle your water bills quickly and securely with EGLIFE tokens.",
    aiHint: "water droplets"
  },
  {
    icon: Flame,
    title: "Piped Gas",
    description: "Pay for your piped gas connection without any hassle.",
    aiHint: "gas flame"
  },
   {
    icon: Wifi,
    title: "Broadband/Landline",
    description: "Clear your internet and landline dues in a few simple steps.",
    aiHint: "wifi symbol"
  },
   {
    icon: Tv,
    title: "DTH Recharge",
    description: "Recharge your DTH service to enjoy uninterrupted entertainment.",
    aiHint: "television screen"
  },
    { 
    icon: School, 
    title: "Tuition Fees",
    description: "Pay school, college, or university fees directly with your tokens." 
  },
  { 
    icon: Building, 
    title: "Rent Payments",
    description: "Manage your monthly rent payments through our secure platform."
   },
  { 
    icon: HandCoins, 
    title: "Loan EMIs",
    description: "Settle your loan equated monthly installments with ease."
   },
   {
    icon: ShieldCheck,
    title: "Insurance Premium",
    description: "Pay your life, health, or vehicle insurance premiums on time."
   },
   {
    icon: Plane,
    title: "Flight Tickets",
    description: "Book your domestic and international flights using EGLIFE tokens."
   },
   {
    icon: Ticket,
    title: "Event Tickets",
    description: "Purchase tickets for movies, concerts, and other events."
   },
   {
    icon: ShoppingCart,
    title: "Shopping Vouchers",
    description: "Buy gift cards and vouchers for your favorite brands and stores.",
    aiHint: "shopping cart"
   },
   {
    icon: Fuel,
    title: "Fuel Payments",
    description: "Pay for fuel at participating petrol pumps across the country.",
    aiHint: "fuel pump"
   }
];

const businessServices = [
    {
        icon: Store,
        title: "Retailer Services",
        description: "Access the retailer portal to manage customers and facilitate payments.",
        link: "#"
    },
    {
        icon: Network,
        title: "Distributor Network",
        description: "Manage your network, track performance, and access distributor tools.",
        link: "#"
    }
]

type TransactionType = "utility" | "credit" | "debit";

interface Transaction {
    name: string;
    date: string;
    amount: number;
    status: "Success" | "Pending" | "Failed";
    type: TransactionType;
    icon: React.ElementType;
}

const transactionHistory: Transaction[] = [
  {
    name: "Jio Recharge",
    date: "2024-08-15",
    amount: -239.00,
    status: "Success",
    type: "utility",
    icon: Smartphone
  },
  {
    name: "Received from Alex",
    date: "2024-08-14",
    amount: 500.00,
    status: "Success",
    type: "credit",
    icon: User,
  },
    {
    name: "Grocery Store",
    date: "2024-08-14",
    amount: -1250.50,
    status: "Success",
    type: "debit",
    icon: QrCode
  },
   {
    name: "Electricity Bill",
    date: "2024-08-12",
    amount: -850.00,
    status: "Success",
    type: "utility",
    icon: Lightbulb
  },
  {
    name: "Sent to Samantha",
    date: "2024-08-11",
    amount: -2000.00,
    status: "Pending",
    type: "debit",
    icon: User,
  }
];

// NOTE: In a real application, this list would be fetched from the Paysprint API
const mobileOperators = [
  { code: "1", name: "Airtel" },
  { code: "2", name: "Jio" },
  { code: "3", name: "Vi (Vodafone Idea)" },
  { code: "4", name: "BSNL Special" },
];


export default function ServicesPage() {
  const [isClient, setIsClient] = useState(false);
  const [filter, setFilter] = useState<"all" | TransactionType>("all");
  const router = useRouter();
  const { toast } = useToast();

  const [mobileNumber, setMobileNumber] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [operator, setOperator] = useState("");
  const [isRecharging, setIsRecharging] = useState(false);

  const [isPlansDialogOpen, setIsPlansDialogOpen] = useState(false);
  const [rechargePlans, setRechargePlans] = useState<RechargePlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredHistory = useMemo(() => {
    if (filter === "all") {
        return transactionHistory;
    }
    return transactionHistory.filter(tx => tx.type === filter);
  }, [filter]);

  const handleFetchPlans = async () => {
    if (!operator) {
      toast({
        variant: "destructive",
        title: "Operator Required",
        description: "Please select a mobile operator to view plans.",
      });
      return;
    }
    setIsLoadingPlans(true);
    setIsPlansDialogOpen(true);
    try {
      const result = await getRechargePlans({ operatorCode: operator, circleCode: "20" }); // Hardcoding Pan India for now
      if (result.success && result.plans) {
        setRechargePlans(result.plans);
      } else {
        toast({
          variant: "destructive",
          title: "Could Not Fetch Plans",
          description: result.message,
        });
        setRechargePlans([]);
      }
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Error Fetching Plans",
        description: error.message || "An unexpected error occurred.",
      });
       setRechargePlans([]);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  const handleSelectPlan = (amount: string) => {
    setRechargeAmount(amount);
    setIsPlansDialogOpen(false);
  };

  const handleRecharge = async () => {
    if (!mobileNumber || !rechargeAmount || !operator) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill in all the fields for the recharge.",
        });
        return;
    }
    
    setIsRecharging(true);
    try {
        const result = await mobileRecharge({
            mobileNumber,
            operatorCode: operator,
            amount: parseFloat(rechargeAmount)
        });

        if (result.success) {
            toast({
                title: "Recharge Successful!",
                description: result.message,
            });
            // Reset form
            setMobileNumber("");
            setRechargeAmount("");
            setOperator("");
        } else {
            toast({
                variant: "destructive",
                title: "Recharge Failed",
                description: result.message,
            });
        }

    } catch (error: any) {
         toast({
            variant: "destructive",
            title: "Recharge Error",
            description: error.message || "An unexpected error occurred.",
        });
    } finally {
        setIsRecharging(false);
    }
  }

  return (
    <>
    <RechargePlansDialog
      isOpen={isPlansDialogOpen}
      onOpenChange={setIsPlansDialogOpen}
      plans={rechargePlans}
      isLoading={isLoadingPlans}
      onSelectPlan={handleSelectPlan}
      operatorName={mobileOperators.find(op => op.code === operator)?.name || 'Selected'}
    />
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">EGPAY: Powered by EGLIFE</h1>
        <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
          Leveraging the power of the EGLIFE token to create a fast, secure, and low-cost payment ecosystem for your daily needs.
        </p>
      </div>
      
      <Card className="mb-12">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Transfer Money & Pay Bills</CardTitle>
            <CardDescription>Send money, pay bills, and manage your finances with ease.</CardDescription>
        </CardHeader>
        <CardContent>
             {isClient && (
                <Tabs defaultValue="recharge" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="recharge"><Smartphone className="mr-2 h-4 w-4" />Recharge</TabsTrigger>
                        <TabsTrigger value="bank"><BankIcon className="mr-2 h-4 w-4" />To Bank</TabsTrigger>
                        <TabsTrigger value="scan"><QrCode className="mr-2 h-4 w-4" />Scan QR</TabsTrigger>
                        <TabsTrigger value="balance"><Wallet className="mr-2 h-4 w-4" />Check Balance</TabsTrigger>
                        <TabsTrigger value="history"><History className="mr-2 h-4 w-4" />History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="recharge" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Mobile Recharge</CardTitle>
                                <CardDescription>Enter the recipient's mobile number, select operator, and enter the amount.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="mobile-number">Enter Mobile Number</Label>
                                    <Input 
                                        id="mobile-number" 
                                        type="tel" 
                                        placeholder="10-digit mobile number" 
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        disabled={isRecharging}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="operator">Select Operator</Label>
                                        <Select value={operator} onValueChange={setOperator} disabled={isRecharging}>
                                            <SelectTrigger id="operator">
                                                <SelectValue placeholder="Choose an operator" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mobileOperators.map(op => (
                                                    <SelectItem key={op.code} value={op.code}>{op.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mobile-amount">Enter Amount</Label>
                                        <div className="flex gap-2">
                                          <Input 
                                              id="mobile-amount" 
                                              type="number" 
                                              placeholder="₹"
                                              value={rechargeAmount}
                                              onChange={(e) => setRechargeAmount(e.target.value)}
                                              disabled={isRecharging}
                                          />
                                          <Button variant="outline" onClick={handleFetchPlans} disabled={!operator || isRecharging}>View Plans</Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleRecharge} disabled={isRecharging}>
                                    {isRecharging ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Processing...</>
                                    ) : (
                                        "Proceed to Recharge"
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="bank" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Send to Bank Account</CardTitle>
                                <CardDescription>Enter the recipient's bank details and the amount to send.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                    <Label htmlFor="account-number">Enter Account Number</Label>
                                    <Input id="account-number" type="text" placeholder="Recipient's account number" />
                                </div>
                                    <div className="space-y-2">
                                    <Label htmlFor="ifsc-code">Enter IFSC Code</Label>
                                    <Input id="ifsc-code" type="text" placeholder="Bank's IFSC code" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bank-amount">Enter Amount</Label>
                                    <Input id="bank-amount" type="number" placeholder="₹0.00" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Proceed to Pay</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>


                    <TabsContent value="scan" className="mt-6">
                        <Card className="text-center flex flex-col items-center justify-center p-8 min-h-[300px]">
                            <QrCode className="w-24 h-24 text-muted-foreground mb-4"/>
                            <h3 className="text-xl font-semibold">Scan any QR code</h3>
                            <p className="text-muted-foreground mt-2">Position the QR code within the frame to pay.</p>
                            <Button variant="outline" className="mt-6">Open Camera</Button>
                        </Card>
                    </TabsContent>

                    <TabsContent value="balance" className="mt-6">
                        <Card className="text-center p-8 min-h-26 flex flex-col justify-center">
                            <Wallet className="w-16 h-16 text-primary mx-auto mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">Check Your EGLIFE Balance</h3>
                            <p className="text-muted-foreground mb-6">Click the button below to see your current balance.</p>
                            <Button size="lg">Check Balance</Button>
                        </Card>
                    </TabsContent>

                    <TabsContent value="history" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction History</CardTitle>
                                <CardDescription>View your recent UPI transactions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center gap-2 mb-6">
                                    <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
                                    <Button variant={filter === 'credit' ? 'default' : 'outline'} onClick={() => setFilter('credit')}>Credit</Button>
                                    <Button variant={filter === 'debit' ? 'default' : 'outline'} onClick={() => setFilter('debit')}>Debit</Button>
                                    <Button variant={filter === 'utility' ? 'default' : 'outline'} onClick={() => setFilter('utility')}>Utility</Button>
                                </div>
                                <div className="space-y-4">
                                {filteredHistory.length > 0 ? filteredHistory.map((tx, index) => {
                                    const isCredit = tx.amount > 0;
                                    return (
                                    <div key={index} className="flex items-center p-2 rounded-md hover:bg-muted/50">
                                        <Avatar className="h-10 w-10 mr-4">
                                            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10">
                                                <tx.icon className="h-5 w-5 text-primary" />
                                            </div>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-semibold">{tx.name}</p>
                                            <p className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold ${isCredit ? 'text-green-500' : 'text-foreground'}`}>
                                                {isCredit ? '+' : ''}₹{Math.abs(tx.amount).toFixed(2)}
                                            </p>
                                            <Badge variant={tx.status === 'Success' ? 'default' : 'secondary'} className={cn({'bg-amber-500/80 text-white': tx.status === 'Pending', 'bg-red-500/80 text-white': tx.status === 'Failed' })}>
                                                {tx.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    )
                                }) : (
                                    <div className="text-center py-10 text-muted-foreground">
                                        <p>No transactions found for this category.</p>
                                    </div>
                                )}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" disabled={filteredHistory.length === 0}>Load More</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </CardContent>
      </Card>


      <h2 className="text-3xl font-headline font-bold mb-8 text-center">Utility Bill Payments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service) => {
            const Icon = service.icon;
            return (
          <Card key={service.title} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl mb-1">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                 <Button asChild variant="link" className="p-0 h-auto text-sm text-accent">
                    <Link href="#">
                        Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
          </Card>
        )})}
      </div>

       <div className="mt-20">
          <h2 className="text-3xl font-headline font-bold mb-8 text-center">Business &amp; Partner Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessServices.map((service) => {
                const Icon = service.icon;
                return (
              <Card key={service.title} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl mb-1">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                     <Button asChild variant="link" className="p-0 h-auto text-sm text-accent">
                        <Link href={service.link}>
                            Go to Portal <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
              </Card>
            )})}
          </div>
       </div>

       <div className="text-center mt-20">
          <h2 className="text-3xl font-headline font-bold">And Much More...</h2>
          <p className="text-lg text-foreground/80 mt-2 max-w-2xl mx-auto">
              Our vision is to create a seamless financial experience by integrating EGPAY with the services you use every day, making transactions effortless and universal. More services will be added soon.
          </p>
           <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
              <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
                <p>... and many other upcoming services!</p>
              </div>
            </div>
      </div>
      
      <section className="w-full mt-16 pt-8 border-t">
        <div className="container mx-auto px-4 md:px-6 flex justify-between">
            <Button asChild variant="outline" onClick={() => router.back()}>
                <Link href="#">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous Page
                </Link>
            </Button>
            <Button asChild>
                <Link href="/staking">
                    Next Page <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </section>
    </div>
    </>
  );
}
