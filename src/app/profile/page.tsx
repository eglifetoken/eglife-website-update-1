
"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useAccount } from "wagmi";
import { Banknote, QrCode, PlusCircle, Trash2, UserCircle, Loader2 } from "lucide-react";
import QRCode from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

const mockAccounts = [
    { id: 1, holderName: "Satoshi Nakamoto", bankName: "Bank of Blockchain", accountNumber: "XXXX XXXX XXXX 1234", ifsc: "BTC0000001" },
    { id: 2, holderName: "Vitalik Buterin", bankName: "Ethereum Federal", accountNumber: "XXXX XXXX XXXX 5678", ifsc: "ETH0000002" },
];

export default function ProfilePage() {
    const [isClient, setIsClient] = useState(false);
    const { address, isConnected } = useAccount();
    const { toast } = useToast();
    const [accounts, setAccounts] = useState(mockAccounts);
    const [upiId, setUpiId] = useState("user@egpay");
    const [qrValue, setQrValue] = useState<string | null>(null);

    // State for the "Add Account" dialog
    const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
    const [newHolderName, setNewHolderName] = useState("");
    const [newAccountNumber, setNewAccountNumber] = useState("");
    const [newIfsc, setNewIfsc] = useState("");
    const [newBankName, setNewBankName] = useState("");

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isConnected && address) {
            setUpiId(`${address.slice(0,8)}@egpay`);
        } else {
            setUpiId("user@egpay");
        }
    }, [isConnected, address]);


    const handleGenerateUpi = () => {
        const newUpiId = `${(address || 'user').slice(0,8)}${Math.floor(100 + Math.random() * 900)}@egpay`;
        setUpiId(newUpiId);
         toast({
            title: "UPI ID Generated!",
            description: `Your new UPI ID is: ${newUpiId}`,
        });
    }

    const generateQrCode = (account: any) => {
        const upiString = `upi://pay?pa=${upiId}&pn=${account.holderName}&am=&cu=INR&tn=Payment for EGLIFE`;
        setQrValue(upiString);
    }
    
    const handleAddAccount = () => {
        if (!newHolderName || !newAccountNumber || !newIfsc || !newBankName) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill out all the fields to add a new account.",
            });
            return;
        }

        const newAccount = {
            id: Date.now(), // Use a simple unique ID for client-side state
            holderName: newHolderName,
            accountNumber: newAccountNumber,
            ifsc: newIfsc,
            bankName: newBankName,
        };

        setAccounts([...accounts, newAccount]);
        
        toast({
            title: "Account Added!",
            description: "The new bank account has been linked successfully.",
        });

        // Reset form and close dialog
        setNewHolderName("");
        setNewAccountNumber("");
        setNewIfsc("");
        setNewBankName("");
        setIsAddAccountDialogOpen(false);
    };

    const handleDeleteAccount = (id: number) => {
        setAccounts(accounts.filter(acc => acc.id !== id));
        toast({
            variant: "destructive",
            title: "Account Removed",
            description: "The selected bank account has been unlinked.",
        });
    };

    if (!isClient) {
      return (
          <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">My Profile</h1>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                    Manage your connected accounts, UPI ID, and payment settings.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Info Card */}
                <div className="lg:col-span-1">
                     <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                             <div className="p-3 bg-primary/10 rounded-md w-fit">
                                <UserCircle className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-2xl">Your Information</CardTitle>
                                <CardDescription>Your connected wallet.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                           {isConnected ? (
                                <div>
                                    <Label className="text-xs text-muted-foreground">Wallet Address</Label>
                                    <p className="font-mono text-sm break-all">{address}</p>
                                </div>
                           ) : (
                                <p className="text-muted-foreground">Please connect your wallet to view your profile.</p>
                           )}
                        </CardContent>
                    </Card>
                </div>

                {/* Linked Accounts & UPI */}
                <div className="lg:col-span-2 space-y-8">
                    {/* UPI Management */}
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline">Manage Your UPI ID</CardTitle>
                            <CardDescription>Use this UPI ID to receive payments from any UPI app.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="upi-id">Your UPI ID</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="upi-id" value={upiId} readOnly />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                             <Button onClick={handleGenerateUpi} variant="outline" disabled={!isConnected}>Generate New UPI ID</Button>
                        </CardFooter>
                    </Card>


                    {/* Linked Bank Accounts */}
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle className="font-headline">Linked Bank Accounts</CardTitle>
                                <CardDescription>These accounts can be used to receive payments.</CardDescription>
                            </div>
                             <Dialog open={isAddAccountDialogOpen} onOpenChange={setIsAddAccountDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Account</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Bank Account</DialogTitle>
                                        <DialogDescription>Enter your account details. This information will be used to receive payments.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="holder-name" className="text-right">Holder Name</Label>
                                            <Input id="holder-name" className="col-span-3" value={newHolderName} onChange={(e) => setNewHolderName(e.target.value)} />
                                        </div>
                                         <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="bank-name" className="text-right">Bank Name</Label>
                                            <Input id="bank-name" className="col-span-3" value={newBankName} onChange={(e) => setNewBankName(e.target.value)} />
                                        </div>
                                         <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="account-number" className="text-right">Account Number</Label>
                                            <Input id="account-number" className="col-span-3" value={newAccountNumber} onChange={(e) => setNewAccountNumber(e.target.value)} />
                                        </div>
                                         <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="ifsc" className="text-right">IFSC Code</Label>
                                            <Input id="ifsc" className="col-span-3" value={newIfsc} onChange={(e) => setNewIfsc(e.target.value)} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" onClick={handleAddAccount}>Save Account</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {accounts.length > 0 ? accounts.map(account => (
                                    <div key={account.id} className="flex justify-between items-center p-4 border rounded-lg bg-muted/20">
                                        <div>
                                            <p className="font-semibold">{account.holderName}</p>
                                            <p className="text-sm text-muted-foreground">{account.bankName}</p>
                                            <p className="text-sm font-mono">{account.accountNumber}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                           <Dialog onOpenChange={(open) => !open && setQrValue(null)}>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => generateQrCode(account)}>
                                                        <QrCode className="h-5 w-5" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                    <DialogTitle>Receive Payment</DialogTitle>
                                                    <DialogDescription>
                                                        Scan this QR code with any UPI app to receive payment to this account.
                                                    </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex items-center justify-center p-4">
                                                        {qrValue && <QRCode value={qrValue} size={256} />}
                                                    </div>
                                                    <p className="text-center text-sm font-mono break-all">{upiId}</p>
                                                </DialogContent>
                                            </Dialog>

                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteAccount(account.id)}>
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                )) : (
                                     <div className="text-center py-8 text-muted-foreground">
                                        <p>No bank accounts linked yet.</p>
                                        <p className="text-sm">Click "Add Account" to get started.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
