

"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAccount } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import { Handshake, Repeat, ShoppingCart, Tag, History, Landmark, IndianRupee, Loader2, UserPlus, AlertCircle, ShieldCheck, PenSquare, Filter, RefreshCw, MoreVertical, ChevronDown, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/firebase/client";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const mockSellOrders = [
  { id: '1', seller: 'CryptoKing', orders: 124, completion: '99.8%', avgTime: '10 min', price: 91.50, available: 5000, minLimit: 500, maxLimit: 50000, methods: ['UPI', 'IMPS'] },
  { id: '2', seller: 'TokenTrader', orders: 471, completion: '100%', avgTime: '5 min', price: 91.52, available: 10000, minLimit: 1000, maxLimit: 85000, methods: ['Bank Transfer'] },
  { id: '3', seller: 'EGLifer', orders: 88, completion: '98.5%', avgTime: '15 min', price: 91.55, available: 2500, minLimit: 100, maxLimit: 25000, methods: ['UPI'] },
  { id: '4', seller: 'FastDealer', orders: 832, completion: '100%', avgTime: '2 min', price: 91.60, available: 25000, minLimit: 5000, maxLimit: 200000, methods: ['UPI', 'Google Pay', 'PhonePe'] },
];

const mockUserOrders = [
    { id: 'S001', type: 'SELL', amount: 2000, price: 91.51, status: 'OPEN' },
    { id: 'B001', type: 'BUY', amount: 1000, price: 91.50, status: 'PENDING_PAYMENT' },
    { id: 'B002', type: 'BUY', amount: 500, price: 91.52, status: 'COMPLETED' },
];

const cryptos = ['USDT', 'BTC', 'EGLIFE', 'FDUSD', 'BNB', 'ETH', 'ADA'];


function P2PRegistration({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
    const { address } = useAccount();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegistration = async () => {
        if (!name || !mobile || !email) {
            toast({ variant: 'destructive', title: 'Missing Information', description: 'Please fill all the fields.' });
            return;
        }
        if (!address) {
             toast({ variant: 'destructive', title: 'Wallet Not Connected', description: 'Please connect your wallet first.' });
            return;
        }
        setIsRegistering(true);
        try {
            const userRef = doc(db, 'p2p_users', address);
            await setDoc(userRef, {
                walletAddress: address,
                name,
                mobile,
                email,
                registeredAt: serverTimestamp()
            }, { merge: true });

            toast({ title: 'Registration Successful!', description: 'You can now access P2P trading.' });
            onRegisterSuccess();
        } catch (error) {
            console.error("P2P Registration Error: ", error);
            toast({ variant: 'destructive', title: 'Registration Failed', description: 'Could not complete registration. Please try again.' });
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader className="text-center">
                <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-headline text-2xl">Register for P2P Trading</CardTitle>
                <CardDescription>To ensure security, please complete this one-time registration to buy and sell on our P2P platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="p2p-name">Full Name</Label>
                    <Input id="p2p-name" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="p2p-mobile">Mobile Number</Label>
                    <Input id="p2p-mobile" type="tel" placeholder="Enter your mobile number" value={mobile} onChange={e => setMobile(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="p2p-email">Email Address</Label>
                    <Input id="p2p-email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleRegistration} disabled={isRegistering}>
                    {isRegistering ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Registering...</> : 'Register & Start Trading'}
                </Button>
            </CardFooter>
        </Card>
    );
}


export default function TradePage() {
    const { address, isConnected } = useAccount();
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCrypto, setActiveCrypto] = useState('USDT');

    // State for creating a sell order
    const [adType, setAdType] = useState('sell');
    const [adAsset, setAdAsset] = useState('EGLIFE');
    const [adQuantity, setAdQuantity] = useState('');
    const [adPrice, setAdPrice] = useState('');
    const [adUpiId, setAdUpiId] = useState('');
    const [isCreatingAd, setIsCreatingAd] = useState(false);
    
    // State for buying from an order
    const [buyAmountInr, setBuyAmountInr] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<(typeof mockSellOrders)[0] | null>(null);

     useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const checkRegistration = async () => {
            if (isConnected && address) {
                const userRef = doc(db, 'p2p_users', address);
                try {
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        setIsRegistered(true);
                    }
                } catch (error) {
                    console.error("Firebase check failed:", error);
                }
            }
            setIsLoading(false);
        };

        checkRegistration();
    }, [isClient, isConnected, address]);

     const handleCreateAd = () => {
        if (!adQuantity || !adPrice || !adUpiId) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill out all fields to create an ad.',
            });
            return;
        }
        setIsCreatingAd(true);
        // Simulate API call
        setTimeout(() => {
            toast({
                title: 'Ad Posted!',
                description: `Your ${adType} ad for ${adQuantity} ${adAsset} at ₹${adPrice} has been posted.`,
            });
            // Reset form
            setAdQuantity('');
            setAdPrice('');
            setAdUpiId('');
            setIsCreatingAd(false);
        }, 1500);
    }
    
    const calculatedEglifeToReceive = selectedOrder ? (parseFloat(buyAmountInr || '0') / selectedOrder.price).toFixed(2) : '0.00';


    if (!isClient || isLoading) {
        return <div className="flex h-[calc(100vh-10rem)] items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
    }

    if (!isConnected) {
        return (
             <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 flex items-center justify-center">
                <Card className="text-center max-w-md">
                    <CardHeader>
                        <AlertCircle className="mx-auto h-12 w-12 text-primary" />
                        <CardTitle className="font-headline text-2xl">Wallet Not Connected</CardTitle>
                        <CardDescription>Please connect your wallet to use the P2P trading platform.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    if (!isRegistered) {
        return (
            <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
                <P2PRegistration onRegisterSuccess={() => setIsRegistered(true)} />
            </div>
        )
    }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center justify-between mb-6">
            <Tabs defaultValue="p2p" className="w-full">
                <TabsList>
                    <TabsTrigger value="express">Express</TabsTrigger>
                    <TabsTrigger value="p2p">P2P</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">Post new Ad</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a P2P Advertisement</DialogTitle>
                            <DialogDescription>Set your own price and payment methods to trade with others.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <Tabs value={adType} onValueChange={setAdType} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="buy">I want to Buy</TabsTrigger>
                                    <TabsTrigger value="sell">I want to Sell</TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Asset</Label>
                                    <Select value={adAsset} onValueChange={setAdAsset}>
                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                        <SelectContent>
                                            {cryptos.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>With Fiat</Label>
                                    <Select defaultValue="INR">
                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="INR">INR</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ad-quantity">Quantity ({adAsset})</Label>
                                <Input id="ad-quantity" type="number" placeholder="Enter quantity to sell" value={adQuantity} onChange={e => setAdQuantity(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="ad-price">Price per {adAsset} (INR)</Label>
                                <Input id="ad-price" type="number" placeholder="Set your price" value={adPrice} onChange={e => setAdPrice(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ad-upi">Your UPI ID for Payments</Label>
                                <Input id="ad-upi" placeholder="your-upi@oksbi" value={adUpiId} onChange={e => setAdUpiId(e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button onClick={handleCreateAd} disabled={isCreatingAd}>
                                {isCreatingAd ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Posting...</> : 'Post Ad'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button>
            </div>
        </div>

        <Tabs defaultValue="buy" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                 <TabsList className="grid grid-cols-2 p-1 h-auto">
                    <TabsTrigger value="buy" className="px-6 py-2">Buy</TabsTrigger>
                    <TabsTrigger value="sell" className="px-6 py-2">Sell</TabsTrigger>
                </TabsList>
                <div className="flex-1 overflow-x-auto">
                    <div className="flex items-center gap-4 border-b border-border">
                        {cryptos.map(crypto => (
                            <Button 
                                key={crypto} 
                                variant="ghost" 
                                size="sm" 
                                className={`shrink-0 rounded-none ${activeCrypto === crypto ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                                onClick={() => setActiveCrypto(crypto)}
                            >
                                {crypto}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 my-4 p-4 bg-card rounded-lg border">
                <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="amount" className="text-xs text-muted-foreground">Amount</Label>
                    <div className="relative">
                        <Input id="amount" placeholder="Enter amount" className="pr-20"/>
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <Select defaultValue="INR">
                                <SelectTrigger className="w-[70px] border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="INR">INR</SelectItem>
                                    <SelectItem value="USD">USD</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="payment" className="text-xs text-muted-foreground">Payment Method</Label>
                    <Select>
                        <SelectTrigger id="payment">
                            <SelectValue placeholder="All payment methods" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All payment methods</SelectItem>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="imps">IMPS</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-end gap-2">
                    <Button>Search</Button>
                    <Button variant="ghost" size="sm">Reset</Button>
                </div>
            </div>

            <TabsContent value="buy">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Buy {activeCrypto}</CardTitle>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm"><RefreshCw className="mr-2 h-4 w-4"/>Refresh</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                         <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="min-w-[200px]">Advertisers</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="min-w-[200px]">Available | Limit</TableHead>
                                        <TableHead className="min-w-[150px]">Payment</TableHead>
                                        <TableHead className="text-right">Trade</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockSellOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                     <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-primary">{order.seller.charAt(0)}</div>
                                                    <div>
                                                        <div className="font-bold">{order.seller}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            <span>{order.orders} orders</span>
                                                            <span className="mx-1">|</span>
                                                            <span>{order.completion} completion</span>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">{order.avgTime} avg. release</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-lg font-semibold">₹{order.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <div><span className="font-semibold">{order.available.toLocaleString()}</span> <span className="text-muted-foreground">{activeCrypto}</span></div>
                                                <div className="text-xs text-muted-foreground">Limit: ₹{order.minLimit.toLocaleString()} - ₹{order.maxLimit.toLocaleString()}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    {order.methods.map(method => <Badge key={method} variant="outline" className="w-fit">{method}</Badge>)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Dialog onOpenChange={() => setBuyAmountInr('')}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => setSelectedOrder(order)}>Buy {activeCrypto}</Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Buy {activeCrypto} from {selectedOrder?.seller}</DialogTitle>
                                                            <DialogDescription>
                                                                Price: ₹{selectedOrder?.price.toFixed(2)} per {activeCrypto}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4">
                                                            <div className="space-y-2">
                                                                <Label>I want to pay (INR)</Label>
                                                                <div className="relative">
                                                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                    <Input type="number" placeholder={`Min: ${selectedOrder?.minLimit}, Max: ${selectedOrder?.maxLimit}`} className="pl-8" value={buyAmountInr} onChange={(e) => setBuyAmountInr(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>I will receive ({activeCrypto})</Label>
                                                                <div className="relative">
                                                                    <Repeat className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                    <Input value={calculatedEglifeToReceive} readOnly className="pl-8 font-bold"/>
                                                                </div>
                                                            </div>
                                                            <Alert variant="destructive">
                                                            <AlertCircle className="h-4 w-4" />
                                                            <AlertTitle>Important</AlertTitle>
                                                            <AlertDescription>
                                                                Please transfer funds only to the seller's verified payment method shown on the next screen. Do not trust payment details sent via chat.
                                                            </AlertDescription>
                                                            </Alert>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="button" variant="outline">Cancel</Button>
                                                            <Button type="submit" disabled={!buyAmountInr || parseFloat(buyAmountInr) < (selectedOrder?.minLimit ?? 0) || parseFloat(buyAmountInr) > (selectedOrder?.maxLimit ?? Infinity)}>Confirm Buy</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                         </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
