
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Smartphone, Globe, Lightbulb, Droplets, Flame, Wifi, Tv, School, Building, HandCoins, QrCode, Wallet, Banknote, IndianRupee, User, Landmark as BankIcon, History, Store, Network, ShieldCheck, Ticket, Plane, ShoppingCart, Fuel, Loader2, X, Link as LinkIcon, Link2Off, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mobileRecharge } from "@/ai/flows/recharge";
import { getRechargePlans, RechargePlan } from "@/ai/flows/getRechargePlans";
import { RechargePlansDialog } from "@/components/recharge-plans-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTokenData, TokenData } from "@/ai/flows/getTokenData";
import { useAccount, useConnect, useBalance, useDisconnect, useSwitchChain, useChainId } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { formatEther } from "viem";
import { bsc } from "wagmi/chains";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import QRCode from "qrcode.react";
import { db } from "@/firebase/client";
import { doc, getDoc } from "firebase/firestore";


const EGLIFE_TOKEN_CONTRACT = '0xca326a5e15b9451efC1A6BddaD6fB098a4D09113';

const services = [
  {
    id: "recharge",
    icon: Smartphone,
    title: "Mobile Recharge",
    description: "Instantly top-up your prepaid mobile plan or pay your postpaid bill.",
  },
  {
    id: "transfer",
    icon: BankIcon,
    title: "Money Transfer",
    description: "Send money directly to a bank account.",
  },
  {
    id: "electricity",
    icon: Lightbulb,
    title: "Electricity Bill",
    description: "Pay your electricity bills from various providers across the country.",
  },
  {
    id: "water",
    icon: Droplets,
    title: "Water Bill",
    description: "Settle your water bills quickly and securely with EGLIFE tokens.",
  },
  {
    id: "gas",
    icon: Flame,
    title: "Piped Gas",
    description: "Pay for your piped gas connection without any hassle.",
  },
   {
    id: "broadband",
    icon: Wifi,
    title: "Broadband/Landline",
    description: "Clear your internet and landline dues in a few simple steps.",
  },
   {
    id: "dth",
    icon: Tv,
    title: "DTH Recharge",
    description: "Recharge your DTH service to enjoy uninterrupted entertainment.",
  },
    {
    id: "tuition",
    icon: School,
    title: "Tuition Fees",
    description: "Pay school, college, or university fees directly with your tokens."
  },
  {
    id: "rent",
    icon: Building,
    title: "Rent Payments",
    description: "Manage your monthly rent payments through our secure platform."
   },
  {
    id: "loan",
    icon: HandCoins,
    title: "Loan EMIs",
    description: "Settle your loan equated monthly installments with ease."
   },
   {
    id: "insurance",
    icon: ShieldCheck,
    title: "Insurance Premium",
    description: "Pay your life, health, or vehicle insurance premiums on time."
   },
   {
    id: "flight",
    icon: Plane,
    title: "Flight Tickets",
    description: "Book your domestic and international flights using EGLIFE tokens."
   },
   {
    id: "events",
    icon: Ticket,
    title: "Event Tickets",
    description: "Purchase tickets for movies, concerts, and other events."
   },
   {
    id: "vouchers",
    icon: ShoppingCart,
    title: "Shopping Vouchers",
    description: "Buy gift cards and vouchers for your favorite brands and stores.",
   },
   {
    id: "fuel",
    icon: Fuel,
    title: "Fuel Payments",
    description: "Pay for fuel at participating petrol pumps across the country.",
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

// NOTE: In a real application, this list would be fetched from the Paysprint API
const mobileOperators = [
  { code: "1", name: "Airtel" },
  { code: "2", name: "Jio" },
  { code: "3", name: "Vi (Vodafone Idea)" },
  { code: "4", name: "BSNL Special" },
];


export default function ServicesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Wallet and chain state
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const isWrongNetwork = isConnected && chainId !== bsc.id;

  const { data: eglifeBalance, refetch: refetchBalance } = useBalance({
    address,
    token: EGLIFE_TOKEN_CONTRACT,
    query: { enabled: !!address }
  });

  // Token price state
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [masterUpiId, setMasterUpiId] = useState("loading...");

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
        try {
            const data = await getTokenData();
            setTokenData(data);
        } catch (error) {
            console.error("Failed to fetch token data:", error);
        }
    };
    const fetchUpiId = async () => {
        try {
            const docRef = doc(db, "settings", "upi");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().id) {
                setMasterUpiId(docSnap.data().id);
            } else {
                setMasterUpiId("default.upi@provider"); // Fallback
            }
        } catch (error) {
            console.error("Error fetching UPI ID:", error);
            setMasterUpiId("default.upi@provider"); // Fallback
        }
    };
    fetchData();
    fetchUpiId();
  }, []);

  // State for Mobile Recharge
  const [mobileNumber, setMobileNumber] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [operator, setOperator] = useState("");
  const [isRecharging, setIsRecharging] = useState(false);
  const [upiTxnId, setUpiTxnId] = useState("");
  
  // State for Money Transfer
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [upiId, setUpiId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");


  const [isPlansDialogOpen, setIsPlansDialogOpen] = useState(false);
  const [rechargePlans, setRechargePlans] = useState<RechargePlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);


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
          description: result.message || "No plans were found for the selected operator.",
        });
        setRechargePlans([]);
      }
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Error Fetching Plans",
        description: error.message || "An unexpected error occurred while fetching plans.",
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

  const handleRecharge = async (paymentMethod: "TOKEN" | "UPI" = "TOKEN") => {
    setIsRecharging(true);
    try {
        if (paymentMethod === "UPI") {
            // Here, you would add logic to verify the UPI transaction ID with your backend.
            // For now, we'll just log it and proceed.
            if(!upiTxnId) {
                toast({
                    variant: "destructive",
                    title: "Transaction ID Required",
                    description: "Please enter the UPI transaction ID to confirm payment."
                });
                setIsRecharging(false);
                return;
            }
            console.log(`Processing recharge via UPI with Txn ID: ${upiTxnId}`);
        } else {
            // Token payment logic remains the same
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

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
            if (paymentMethod === "TOKEN") {
                refetchBalance(); // Refetch balance only for token payments
            }
            // Reset form
            setMobileNumber("");
            setRechargeAmount("");
            setOperator("");
            setUpiTxnId("");
            setSelectedService(null);
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

  const renderServiceForm = () => {
    const rechargeCostInEg = (tokenData && rechargeAmount) ? (parseFloat(rechargeAmount) / 83) / tokenData.priceUsd : 0;
    const hasSufficientBalance = eglifeBalance ? parseFloat(formatEther(eglifeBalance.value)) >= rechargeCostInEg : false;
    const qrValue = `upi://pay?pa=${masterUpiId}&pn=EGLIFE%20Token&am=${rechargeAmount}&cu=INR`;

    if (!isConnected) {
        return (
             <Card className="relative text-center">
                <CardHeader>
                    <CardTitle>Wallet Not Connected</CardTitle>
                    <CardDescription>Please connect your wallet to use EGPAY services.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => connect({ connector: injected() })}>
                        <LinkIcon className="mr-2 h-4 w-4" /> Connect Wallet
                    </Button>
                </CardContent>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setSelectedService(null)}>
                    <X className="h-5 w-5" />
                </Button>
            </Card>
        )
    }

    if (isWrongNetwork) {
         return (
             <Card className="relative text-center">
                <CardHeader>
                    <CardTitle>Wrong Network</CardTitle>
                    <CardDescription>Please switch to the BNB Smart Chain to use our services.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => switchChain({ chainId: bsc.id })} variant="destructive">
                        Switch to BSC
                    </Button>
                </CardContent>
                 <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setSelectedService(null)}>
                    <X className="h-5 w-5" />
                </Button>
            </Card>
        )
    }


    switch (selectedService) {
        case 'recharge':
            return (
                <Card className="relative">
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="w-full" disabled={isRecharging || !mobileNumber || !rechargeAmount || !operator}>
                                    Proceed to Pay
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You are about to pay for a recharge of ₹{rechargeAmount}. Choose your payment method.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                               
                                <Tabs defaultValue="token" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="token"><Wallet className="mr-2 h-4 w-4" /> EGLIFE Token</TabsTrigger>
                                        <TabsTrigger value="upi"><IndianRupee className="mr-2 h-4 w-4" /> UPI</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="token" className="pt-4">
                                        {tokenData && eglifeBalance ? (
                                            <div className="space-y-4">
                                                <div className="p-4 rounded-lg border bg-muted/50">
                                                    <p className="text-sm text-muted-foreground">You will pay (approx.)</p>
                                                    <p className="text-xl font-bold">{rechargeCostInEg.toFixed(4)} EGLIFE</p>
                                                </div>
                                                 <div className="p-4 rounded-lg border">
                                                    <p className="text-sm text-muted-foreground">Your current balance</p>
                                                    <p className="text-xl font-bold">{parseFloat(formatEther(eglifeBalance.value)).toFixed(4)} EGLIFE</p>
                                                </div>
                                                {!hasSufficientBalance && (
                                                    <Alert variant="destructive">
                                                        <AlertTriangle className="h-4 w-4" />
                                                        <AlertTitle>Insufficient Balance</AlertTitle>
                                                        <AlertDescription>
                                                            You do not have enough EGLIFE tokens to complete this transaction.
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleRecharge("TOKEN")} disabled={isRecharging || !hasSufficientBalance}>
                                                         {isRecharging ? (
                                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Confirming...</>
                                                        ) : (
                                                            "Confirm Payment"
                                                        )}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin"/></div>
                                        )}
                                    </TabsContent>
                                     <TabsContent value="upi" className="pt-4">
                                         <div className="space-y-4">
                                            <Alert>
                                                <AlertTriangle className="h-4 w-4" />
                                                <AlertTitle>Action Required</AlertTitle>
                                                <AlertDescription>
                                                   Scan the QR to pay ₹{rechargeAmount}. After payment, enter the UPI Transaction ID below.
                                                </AlertDescription>
                                            </Alert>
                                            <div className="flex items-center justify-center p-4 bg-white rounded-lg">
                                                {masterUpiId === "loading..." ? <Loader2 className="h-12 w-12 animate-spin"/> : <QRCode value={qrValue} size={180} />}
                                            </div>
                                            <div className="text-center font-mono text-sm">
                                                Pay to: <strong>{masterUpiId}</strong>
                                            </div>
                                             <div className="space-y-2">
                                                <Label htmlFor="upiTxnId">UPI Transaction ID / UTR</Label>
                                                <Input id="upiTxnId" placeholder="12-digit transaction ID" value={upiTxnId} onChange={(e) => setUpiTxnId(e.target.value)} disabled={isRecharging} />
                                            </div>
                                             <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleRecharge("UPI")} disabled={isRecharging || !upiTxnId}>
                                                    {isRecharging ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Confirming...</> : "Confirm UPI Payment"}
                                                </AlertDialogAction>
                                             </AlertDialogFooter>
                                         </div>
                                     </TabsContent>
                                </Tabs>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setSelectedService(null)}>
                        <X className="h-5 w-5" />
                    </Button>
                </Card>
            );
        case 'transfer':
            return (
                 <Card className="relative">
                    <CardHeader>
                        <CardTitle>Money Transfer</CardTitle>
                        <CardDescription>Select a method to send money to a recipient.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="mobile" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="mobile"><Wallet className="mr-2 h-4 w-4"/>Mobile</TabsTrigger>
                                <TabsTrigger value="account"><BankIcon className="mr-2 h-4 w-4"/>Account</TabsTrigger>
                                <TabsTrigger value="upi"><IndianRupee className="mr-2 h-4 w-4"/>UPI</TabsTrigger>
                                <TabsTrigger value="qr"><QrCode className="mr-2 h-4 w-4"/>Scan & Pay</TabsTrigger>
                            </TabsList>
                             <TabsContent value="mobile" className="pt-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="transfer-mobile-number">Enter Mobile Number</Label>
                                    <Input
                                        id="transfer-mobile-number"
                                        type="tel"
                                        placeholder="10-digit mobile number"
                                    />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="transfer-mobile-amount">Enter Amount</Label>
                                    <Input 
                                        id="transfer-mobile-amount" 
                                        type="number" 
                                        placeholder="₹0.00"
                                    />
                                </div>
                                <Button className="w-full">Proceed to Pay</Button>
                            </TabsContent>
                            <TabsContent value="account" className="pt-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="account-number">Enter Account Number</Label>
                                    <Input 
                                        id="account-number" 
                                        type="text" 
                                        placeholder="Recipient's account number"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ifsc-code">Enter IFSC Code</Label>
                                    <Input 
                                        id="ifsc-code" 
                                        type="text" 
                                        placeholder="Bank's IFSC code"
                                        value={ifscCode}
                                        onChange={(e) => setIfscCode(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bank-amount">Enter Amount</Label>
                                    <Input 
                                        id="bank-amount" 
                                        type="number" 
                                        placeholder="₹0.00"
                                        value={transferAmount}
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                    />
                                </div>
                                 <Button className="w-full">Proceed to Pay</Button>
                            </TabsContent>
                             <TabsContent value="upi" className="pt-4 space-y-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="upi-id">Enter UPI ID</Label>
                                    <Input 
                                        id="upi-id" 
                                        type="text" 
                                        placeholder="recipient@upi"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="upi-amount">Enter Amount</Label>
                                    <Input 
                                        id="upi-amount"
                                        type="number" 
                                        placeholder="₹0.00"
                                        value={transferAmount}
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                    />
                                </div>
                                 <Button className="w-full">Proceed to Pay</Button>
                            </TabsContent>
                             <TabsContent value="qr" className="pt-4 text-center">
                                <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg">
                                    <QrCode className="h-16 w-16 text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground mb-4">Scan & Pay functionality is coming soon.</p>
                                    <Button disabled>Scan QR Code</Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setSelectedService(null)}>
                        <X className="h-5 w-5" />
                    </Button>
                </Card>
            )
        default:
            return null;
    }
  }

  if (!isClient) {
    return (
        <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
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
      
      <div className="mb-12 min-h-[56px]">
        {selectedService && (
            <div className="transition-all duration-300 ease-in-out">
              {renderServiceForm()}
            </div>
        )}
      </div>


      <h2 className="text-3xl font-headline font-bold mb-8 text-center">Select a Service</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {services.map((service) => {
            const Icon = service.icon;
            const isComingSoon = !['recharge', 'transfer'].includes(service.id);
            return (
              <Card 
                key={service.id} 
                className={`flex flex-col hover:shadow-lg transition-shadow ${isComingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary'}`}
                onClick={() => !isComingSoon && setSelectedService(service.id)}
              >
                <CardHeader className="flex-grow relative">
                    {isComingSoon && <span className="absolute top-2 right-2 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">Soon</span>}
                    <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl mb-1">{service.title}</CardTitle>
                </CardHeader>
                 <CardContent>
                    <p className="text-sm text-foreground/80">{service.description}</p>
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
      
      {isClient &&
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
      }
    </div>
    </>
  );
}
