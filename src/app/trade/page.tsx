
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
import { collection, doc, setDoc, getDoc, serverTimestamp, query, where, onSnapshot, addDoc } from "firebase/firestore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const cryptos = ['USDT', 'BTC', 'EGLIFE', 'FDUSD', 'BNB', 'ETH', 'ADA'];


function P2PRegistration({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
    const { address } = useAccount();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegistration = async () => {
        if (!name || !nickname || !mobile || !email) {
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
                nickname,
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
                    <Label htmlFor="p2p-nickname">Nickname</Label>
                    <Input id="p2p-nickname" placeholder="e.g. CryptoKing" value={nickname} onChange={e => setNickname(e.target.value)} />
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

interface P2POrder {
    id: string;
    type: 'buy' | 'sell';
    nickname: string;
    orders: number;
    completion: string;
    avgTime: string;
    price: number;
    available: number;
    minLimit: number;
    maxLimit: number;
    paymentMethod: string; // Changed from methods array
    asset: string;
    owner: string;
}

interface UserPaymentMethods {
    upiId?: string;
    eRupeeAddress?: string;
    bankAccounts?: { id: string; holderName: string; bankName: string; accountNumber: string; ifsc: string }[];
}

export default function TradePage() {
    const { address, isConnected } = useAccount();
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCrypto, setActiveCrypto] = useState('EGLIFE');
    const [userNickname, setUserNickname] = useState('');

    const [sellOrders, setSellOrders] = useState<P2POrder[]>([]);
    const [buyOrders, setBuyOrders] = useState<P2POrder[]>([]);
    const [isLoadingAds, setIsLoadingAds] = useState(true);
    
    // State for user's payment methods
    const [userPaymentMethods, setUserPaymentMethods] = useState<UserPaymentMethods>({});


    // State for creating a sell order
    const [isAdDialogOpen, setIsAdDialogOpen] = useState(false);
    const [adType, setAdType] = useState('sell');
    const [adAsset, setAdAsset] = useState('EGLIFE');
    const [adQuantity, setAdQuantity] = useState('');
    const [adPrice, setAdPrice] = useState('');
    const [adPaymentMethod, setAdPaymentMethod] = useState('');
    const [isCreatingAd, setIsCreatingAd] = useState(false);
    
    // State for buying from an order
    const [buyAmountInr, setBuyAmountInr] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<P2POrder | null>(null);

     useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const checkRegistrationAndFetchData = async () => {
            if (isConnected && address) {
                const userRef = doc(db, 'p2p_users', address);
                try {
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        setIsRegistered(true);
                        const data = docSnap.data() as UserPaymentMethods & { nickname?: string };
                        setUserNickname(data.nickname || '');
                        setUserPaymentMethods({
                            upiId: data.upiId,
                            eRupeeAddress: data.eRupeeAddress,
                            bankAccounts: data.bankAccounts
                        });

                    }
                } catch (error) {
                    console.error("Firebase check failed:", error);
                }
            }
            setIsLoading(false);
        };

        checkRegistrationAndFetchData();
    }, [isClient, isConnected, address]);

     useEffect(() => {
        if (!isRegistered || !activeCrypto) return;

        setIsLoadingAds(true);
        const q = query(
            collection(db, "p2p_ads"), 
            where("asset", "==", activeCrypto)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedBuyOrders: P2POrder[] = [];
            const fetchedSellOrders: P2POrder[] = [];
            querySnapshot.forEach((doc) => {
                const order = { id: doc.id, ...doc.data() } as P2POrder;
                if (order.type === 'buy') {
                    fetchedBuyOrders.push(order);
                } else if (order.type === 'sell') {
                    fetchedSellOrders.push(order);
                }
            });
            setBuyOrders(fetchedBuyOrders);
            setSellOrders(fetchedSellOrders);
            setIsLoadingAds(false);
        }, (error) => {
            console.error("Error fetching ads:", error);
            toast({ variant: 'destructive', title: 'Failed to load ads', description: 'Please check your connection.' });
            setIsLoadingAds(false);
        });

        return () => unsubscribe();
    }, [isRegistered, activeCrypto, toast]);


     const handleCreateAd = async () => {
        if (!adQuantity || !adPrice || !adPaymentMethod || !address) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill out all fields and select a payment method to create an ad.',
            });
            return;
        }
        setIsCreatingAd(true);

        const newAdData = {
            type: adType,
            asset: adAsset,
            price: parseFloat(adPrice),
            available: parseFloat(adQuantity),
            minLimit: 100, // Placeholder
            maxLimit: parseFloat(adQuantity) * parseFloat(adPrice), // Placeholder
            paymentMethod: adPaymentMethod,
            owner: address,
            nickname: userNickname || 'Anonymous', // Use nickname
            orders: 0,
            completion: 'N/A',
            avgTime: 'N/A',
            createdAt: serverTimestamp()
        };

        const tempId = `temp_${Date.now()}`;
        const optimisticAd = { id: tempId, ...newAdData };

        if (adType === 'sell') {
            setSellOrders(prev => [optimisticAd as P2POrder, ...prev]);
        } else {
            setBuyOrders(prev => [optimisticAd as P2POrder, ...prev]);
        }
        
        setIsAdDialogOpen(false);
        setAdQuantity('');
        setAdPrice('');
        setAdPaymentMethod('');
        setIsCreatingAd(false);
        toast({
            title: 'Ad Posted!',
            description: `Your ${adType} ad for ${adQuantity} ${adAsset} has been posted.`,
        });
        
        try {
            await addDoc(collection(db, "p2p_ads"), newAdData);
        } catch(error) {
            console.error("Error creating ad:", error);
            toast({ variant: 'destructive', title: 'Failed to post ad', description: 'Your ad might not be saved. Please try again.'});
            if (adType === 'sell') {
                setSellOrders(prev => prev.filter(order => order.id !== tempId));
            } else {
                setBuyOrders(prev => prev.filter(order => order.id !== tempId));
            }
        }
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

    const availablePaymentMethods = [
        ...(userPaymentMethods.upiId ? [{ value: userPaymentMethods.upiId, label: `UPI: ${userPaymentMethods.upiId}` }] : []),
        ...(userPaymentMethods.eRupeeAddress ? [{ value: userPaymentMethods.eRupeeAddress, label: `eRupee: ${userPaymentMethods.eRupeeAddress}` }] : []),
        ...(userPaymentMethods.bankAccounts || []).map(acc => ({
            value: `${acc.bankName} - ${acc.accountNumber.slice(-4)}`,
            label: `${acc.bankName} (...${acc.accountNumber.slice(-4)})`
        }))
    ];


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
                <Dialog open={isAdDialogOpen} onOpenChange={setIsAdDialogOpen}>
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
                                <Input id="ad-quantity" type="number" placeholder={`Enter quantity to ${adType}`} value={adQuantity} onChange={e => setAdQuantity(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="ad-price">Price per {adAsset} (INR)</Label>
                                <Input id="ad-price" type="number" placeholder="Set your price" value={adPrice} onChange={e => setAdPrice(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ad-payment-method">Payment Method</Label>
                                <Select value={adPaymentMethod} onValueChange={setAdPaymentMethod}>
                                    <SelectTrigger id="ad-payment-method">
                                        <SelectValue placeholder="Select a payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availablePaymentMethods.length > 0 ? (
                                            availablePaymentMethods.map(method => (
                                                <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-sm text-muted-foreground">No payment methods found in your profile.</div>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAdDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateAd} disabled={isCreatingAd || availablePaymentMethods.length === 0}>
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
                                    {isLoadingAds ? (
                                        <TableRow><TableCell colSpan={5} className="text-center h-24"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></TableCell></TableRow>
                                    ) : sellOrders.length > 0 ? sellOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                     <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-primary">{order.nickname.charAt(0)}</div>
                                                    <div>
                                                        <div className="font-bold">{order.nickname}</div>
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
                                                <Badge variant="outline">{order.paymentMethod}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Dialog onOpenChange={(open) => { if(!open) setBuyAmountInr('') }}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => setSelectedOrder(order)}>Buy {activeCrypto}</Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Buy {activeCrypto} from {selectedOrder?.nickname}</DialogTitle>
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
                                    )) : (
                                        <TableRow><TableCell colSpan={5} className="text-center h-24">No sell orders found for {activeCrypto}.</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                         </div>
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="sell">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Sell {activeCrypto}</CardTitle>
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
                                     {isLoadingAds ? (
                                        <TableRow><TableCell colSpan={5} className="text-center h-24"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></TableCell></TableRow>
                                    ) : buyOrders.length > 0 ? buyOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                     <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-primary">{order.nickname.charAt(0)}</div>
                                                    <div>
                                                        <div className="font-bold">{order.nickname}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            <span>{order.orders} orders</span>
                                                            <span className="mx-1">|</span>
                                                            <span>{order.completion} completion</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-lg font-semibold">₹{order.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <div><span className="font-semibold">{order.available.toLocaleString()}</span> <span className="text-muted-foreground">{activeCrypto}</span></div>
                                                <div className="text-xs text-muted-foreground">Limit: ₹{order.minLimit.toLocaleString()} - ₹{order.maxLimit.toLocaleString()}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{order.paymentMethod}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                               <Button size="sm" variant="destructive">Sell {activeCrypto}</Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={5} className="text-center h-24">No buy orders found for {activeCrypto}.</TableCell></TableRow>
                                    )}
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

    