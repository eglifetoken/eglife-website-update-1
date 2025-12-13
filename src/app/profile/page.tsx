
"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAccount } from "wagmi";
import { Banknote, QrCode, PlusCircle, Trash2, UserCircle, Loader2, ShieldCheck, Mail, Smartphone, Home, Edit, CheckCircle } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface BankAccount {
    id: number;
    holderName: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
}

interface UserProfile {
    name: string;
    email: string;
    mobile: string;
    pan: string;
    aadhar: string;
    address: string;
}

export default function ProfilePage() {
    const [isClient, setIsClient] = useState(false);
    const { address, isConnected } = useAccount();
    const { toast } = useToast();
    
    // User Profile State
    const [profile, setProfile] = useState<UserProfile>({
        name: '', email: '', mobile: '', pan: '', aadhar: '', address: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Payment Methods State
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [upiId, setUpiId] = useState("");
    const [qrValue, setQrValue] = useState<string | null>(null);

    // Dialog State
    const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
    const [isAddUpiDialogOpen, setIsAddUpiDialogOpen] = useState(false);
    
    // New Account Form State
    const [newHolderName, setNewHolderName] = useState("");
    const [newAccountNumber, setNewAccountNumber] = useState("");
    const [newIfsc, setNewIfsc] = useState("");
    const [newBankName, setNewBankName] = useState("");
    const [newUpiId, setNewUpiId] = useState("");

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const isProfileComplete = profile.name && profile.email && profile.mobile && profile.pan && profile.aadhar && profile.address;

    const handleSaveProfile = () => {
        setIsSaving(true);
        // Simulate API call to save profile
        setTimeout(() => {
            // In a real app, you'd save this to a database
            console.log("Saving profile:", profile);
            toast({ title: "Profile Saved!", description: "Your information has been updated." });
            setIsSaving(false);
            setIsEditing(false);
        }, 1500);
    }
    
    const handleAddAccount = () => {
        if (!newHolderName || !newAccountNumber || !newIfsc || !newBankName) {
            toast({ variant: "destructive", title: "Missing Information", description: "Please fill out all bank account fields." });
            return;
        }
        const newAccount: BankAccount = {
            id: Date.now(),
            holderName: newHolderName,
            accountNumber: newAccountNumber,
            ifsc: newIfsc,
            bankName: newBankName,
        };
        setAccounts([...accounts, newAccount]);
        toast({ title: "Bank Account Added!", description: "The new bank account has been linked." });
        setIsAddAccountDialogOpen(false);
        // Reset form
        setNewHolderName(""); setNewAccountNumber(""); setNewIfsc(""); setNewBankName("");
    };

    const handleAddUpi = () => {
        if(!newUpiId) {
            toast({ variant: "destructive", title: "UPI ID Required", description: "Please enter a valid UPI ID." });
            return;
        }
        setUpiId(newUpiId);
        toast({ title: "UPI ID Added!", description: "Your UPI ID has been linked." });
        setIsAddUpiDialogOpen(false);
        setNewUpiId("");
    }

    const handleDeleteAccount = (id: number) => {
        setAccounts(accounts.filter(acc => acc.id !== id));
        toast({ variant: "destructive", title: "Account Removed", description: "The bank account has been unlinked." });
    };
    
    const handleDeleteUpi = () => {
        setUpiId("");
        toast({ variant: "destructive", title: "UPI ID Removed" });
    }

    if (!isClient) {
      return (
          <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      );
    }
    
    if (!isConnected) {
        return (
             <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Card className="text-center max-w-md">
                    <CardHeader>
                        <UserCircle className="mx-auto h-12 w-12 text-primary" />
                        <CardTitle className="font-headline text-2xl">Connect Your Wallet</CardTitle>
                        <CardDescription>Please connect your wallet to view and manage your profile.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
             <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">My Profile & Verification</h1>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                    Complete your profile to get verified for P2P trading and manage your payment methods.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Details Card */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle className="font-headline text-2xl">Your Details</CardTitle>
                                <CardDescription>This information is required for P2P trading verification.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                <Edit className="mr-2 h-4 w-4" />
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} readOnly={!isEditing} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} readOnly={!isEditing} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="mobile">Mobile Number</Label>
                                    <Input id="mobile" type="tel" value={profile.mobile} onChange={(e) => setProfile({...profile, mobile: e.target.value})} readOnly={!isEditing} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="pan">PAN Card Number</Label>
                                    <Input id="pan" value={profile.pan} onChange={(e) => setProfile({...profile, pan: e.target.value})} readOnly={!isEditing} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="aadhar">Aadhar Card Number</Label>
                                    <Input id="aadhar" value={profile.aadhar} onChange={(e) => setProfile({...profile, aadhar: e.target.value})} readOnly={!isEditing} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="address">Full Address</Label>
                                    <Input id="address" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} readOnly={!isEditing} />
                                </div>
                            </div>
                             {isEditing && (
                                <Alert>
                                    <ShieldCheck className="h-4 w-4" />
                                    <AlertTitle>Your data is secure</AlertTitle>
                                    <AlertDescription>
                                    Your personal information is stored securely and will only be used for identity verification for P2P trading.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                        {isEditing && (
                            <CardFooter>
                                <Button className="w-full" onClick={handleSaveProfile} disabled={isSaving}>
                                    {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Saving...</> : 'Save Profile'}
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
                
                 {/* Verification & Wallet Card */}
                <div className="lg:col-span-1 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Verification Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isProfileComplete ? (
                                <Alert className="border-green-500 text-green-500">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <AlertTitle className="text-green-500">Verified</AlertTitle>
                                    <AlertDescription className="text-green-700">
                                        You are eligible for P2P trading.
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <Alert variant="destructive">
                                    <Loader2 className="h-4 w-4" />
                                    <AlertTitle>Not Verified</AlertTitle>
                                    <AlertDescription>
                                        Please complete all fields in "Your Details" to start P2P trading.
                                    </AlertDescription>
                                </Alert>
                            )}
                             <div className="mt-4">
                                <Label className="text-xs text-muted-foreground">Connected Wallet</Label>
                                <p className="font-mono text-sm break-all">{address}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle className="font-headline text-xl">Payment Methods</CardTitle>
                                <CardDescription>Used for P2P trading.</CardDescription>
                            </div>
                             <Dialog open={isAddUpiDialogOpen} onOpenChange={setIsAddUpiDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add UPI</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader><DialogTitle>Add New UPI ID</DialogTitle></DialogHeader>
                                    <div className="py-4"><Input placeholder="your-id@okhdfcbank" value={newUpiId} onChange={(e) => setNewUpiId(e.target.value)} /></div>
                                    <DialogFooter><Button onClick={handleAddUpi}>Save UPI ID</Button></DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {upiId ? (
                                <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/20">
                                    <div>
                                        <p className="font-semibold">UPI ID</p>
                                        <p className="text-sm font-mono">{upiId}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={handleDeleteUpi}>
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                             ) : <p className="text-sm text-center text-muted-foreground">No UPI ID added.</p>}
                            
                            <div className="flex justify-between items-center">
                                <p className="font-medium">Bank Accounts</p>
                                 <Dialog open={isAddAccountDialogOpen} onOpenChange={setIsAddAccountDialogOpen}>
                                    <DialogTrigger asChild><Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add Bank</Button></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Add New Bank Account</DialogTitle></DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <Input placeholder="Holder Name" value={newHolderName} onChange={e => setNewHolderName(e.target.value)} />
                                            <Input placeholder="Bank Name" value={newBankName} onChange={e => setNewBankName(e.target.value)} />
                                            <Input placeholder="Account Number" value={newAccountNumber} onChange={e => setNewAccountNumber(e.target.value)} />
                                            <Input placeholder="IFSC Code" value={newIfsc} onChange={e => setNewIfsc(e.target.value)} />
                                        </div>
                                        <DialogFooter><Button onClick={handleAddAccount}>Save Account</Button></DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>

                             {accounts.length > 0 ? accounts.map(account => (
                                    <div key={account.id} className="flex justify-between items-center p-4 border rounded-lg bg-muted/20">
                                        <div>
                                            <p className="font-semibold">{account.holderName}</p>
                                            <p className="text-sm text-muted-foreground">{account.bankName}</p>
                                            <p className="text-sm font-mono">{account.accountNumber} / {account.ifsc}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteAccount(account.id)}>
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                )) : <p className="text-sm text-center text-muted-foreground">No bank accounts added.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
