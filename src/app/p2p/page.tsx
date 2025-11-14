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
import { Handshake, Repeat, ShoppingCart, Tag, History, Landmark, IndianRupee, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"


// Mock data for P2P orders
const mockSellOrders = [
  { id: '1', seller: 'CryptoKing', price: 2.50, available: 5000, minLimit: 500, maxLimit: 5000, method: 'UPI' },
  { id: '2', seller: 'TokenTrader', price: 2.52, available: 10000, minLimit: 1000, maxLimit: 5000, method: 'UPI' },
  { id: '3', seller: 'EGLifer', price: 2.55, available: 2500, minLimit: 100, maxLimit: 2500, method: 'IMPS' },
];

const mockUserOrders = [
    { id: 'S001', type: 'SELL', amount: 2000, price: 2.51, status: 'OPEN' },
    { id: 'B001', type: 'BUY', amount: 1000, price: 2.50, status: 'PENDING_PAYMENT' },
    { id: 'B002', type: 'BUY', amount: 500, price: 2.52, status: 'COMPLETED' },
]


export default function P2PPage() {
    const { address, isConnected } = useAccount();
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    // State for creating a sell order
    const [sellAmount, setSellAmount] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [upiId, setUpiId] = useState('');
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    
    // State for buying from an order
    const [buyAmountInr, setBuyAmountInr] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<typeof mockSellOrders[0] | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCreateOrder = () => {
        if (!sellAmount || !sellPrice || !upiId) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill out all fields to create an order.',
            });
            return;
        }
        setIsCreatingOrder(true);
        // Simulate API call
        setTimeout(() => {
            toast({
                title: 'Order Created!',
                description: `Your sell order for ${sellAmount} EGLIFE at ₹${sellPrice}/token has been posted.`,
            });
            setSellAmount('');
            setSellPrice('');
            setUpiId('');
            setIsCreatingOrder(false);
        }, 1500);
    }
    
    const calculatedEglifeToReceive = selectedOrder ? (parseFloat(buyAmountInr || '0') / selectedOrder.price).toFixed(2) : '0.00';


    if (!isClient) {
        return <div className="flex h-[calc(100vh-10rem)] items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
    }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">P2P Trading</h1>
            <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                Securely buy and sell EGLIFE tokens directly with other users.
            </p>
        </div>

        <Tabs defaultValue="buy" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="buy"><ShoppingCart className="mr-2 h-4 w-4" /> Buy</TabsTrigger>
                <TabsTrigger value="sell"><Tag className="mr-2 h-4 w-4" /> Sell</TabsTrigger>
                <TabsTrigger value="orders"><History className="mr-2 h-4 w-4" /> My Orders</TabsTrigger>
            </TabsList>

            {/* BUY TAB */}
            <TabsContent value="buy">
                <Card>
                    <CardHeader>
                        <CardTitle>Buy EGLIFE</CardTitle>
                        <CardDescription>Find offers from sellers. Pay them directly and receive tokens in your wallet.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Seller</TableHead>
                                    <TableHead>Price (INR)</TableHead>
                                    <TableHead>Available / Limit</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockSellOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell><div className="font-medium">{order.seller}</div></TableCell>
                                        <TableCell className="font-semibold text-accent">₹{order.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <div>{order.available.toLocaleString()} EGLIFE</div>
                                            <div className="text-xs text-muted-foreground">₹{order.minLimit} - ₹{order.maxLimit}</div>
                                        </TableCell>
                                        <TableCell><Badge variant="secondary">{order.method}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" onClick={() => setSelectedOrder(order)}>Buy</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Buy from {selectedOrder?.seller}</DialogTitle>
                                                        <DialogDescription>
                                                            Price: ₹{selectedOrder?.price.toFixed(2)} per EGLIFE
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="space-y-2">
                                                            <Label>I want to pay (INR)</Label>
                                                            <div className="relative">
                                                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                <Input type="number" placeholder="Enter amount" className="pl-8" value={buyAmountInr} onChange={(e) => setBuyAmountInr(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>I will receive (EGLIFE)</Label>
                                                            <div className="relative">
                                                                <Repeat className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                <Input value={calculatedEglifeToReceive} readOnly className="pl-8 font-bold"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="button" variant="outline">Cancel</Button>
                                                        <Button type="submit" disabled={!buyAmountInr}>Confirm Buy</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* SELL TAB */}
            <TabsContent value="sell">
                <Card>
                    <CardHeader>
                        <CardTitle>Create a Sell Offer</CardTitle>
                        <CardDescription>Set your price and terms to sell your EGLIFE tokens.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="sell-amount">Amount to Sell (EGLIFE)</Label>
                                <Input id="sell-amount" type="number" placeholder="e.g., 1000" value={sellAmount} onChange={e => setSellAmount(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sell-price">Price per Token (INR)</Label>
                                <Input id="sell-price" type="number" placeholder="e.g., 2.55" value={sellPrice} onChange={e => setSellPrice(e.target.value)} />
                            </div>
                         </div>
                        <div className="space-y-2">
                            <Label htmlFor="upi-id">Your UPI ID (for receiving payment)</Label>
                            <div className="flex items-center gap-2">
                                <Landmark className="h-5 w-5 text-muted-foreground" />
                                <Input id="upi-id" placeholder="your-name@upi" value={upiId} onChange={e => setUpiId(e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" disabled={isCreatingOrder || !isConnected} onClick={handleCreateOrder}>
                            {isCreatingOrder ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Handshake className="mr-2 h-4 w-4" />}
                            Create Sell Order
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* MY ORDERS TAB */}
            <TabsContent value="orders">
                 <Card>
                    <CardHeader>
                        <CardTitle>My P2P Orders</CardTitle>
                        <CardDescription>Track the status of your ongoing and completed trades.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount (EGLIFE)</TableHead>
                                    <TableHead>Price (INR)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockUserOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-mono text-xs">{order.id}</TableCell>
                                        <TableCell>
                                            <Badge variant={order.type === 'SELL' ? 'destructive' : 'default'}>{order.type}</Badge>
                                        </TableCell>
                                        <TableCell>{order.amount.toLocaleString()}</TableCell>
                                        <TableCell>₹{order.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{order.status.replace('_', ' ')}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

    </div>
  );
}
