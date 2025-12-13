"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAccount } from "wagmi";
import { Banknote, QrCode, PlusCircle, Trash2, UserCircle, Loader2, ShieldCheck, Mail, Smartphone, Home, Edit, CheckCircle, IndianRupee } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { db } from '@/firebase/client';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';


interface BankAccount {
    id: string;
    holderName: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
}

interface UserProfile {
    name: string;
    nickname: string;
    email: string;
    mobile: string;
    pan: string;
    aadhar: string;
    address: string;
    upiId?: string;
    eRupeeAddress?: string;
    bankAccounts?: BankAccount[];
}

interface VerificationStatus {
    email: boolean;
    mobile: boolean;
    pan: boolean;
    aadhar: boolean;
}

type VerificationField = 'email' | 'mobile' | 'pan' | 'aadhar';

export default function ProfilePage() {
    const [isClient, setIsClient] = useState(false);
    const { address, isConnected } = useAccount();
    const { toast } = useToast();
    
    // User Profile State
    const [profile, setProfile] = useState<UserProfile>({
        name: '', nickname: '', email: '', mobile: '', pan: '', aadhar: '', address: '', upiId: '', eRupeeAddress: '', bankAccounts: []
    });
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // Verification State
    const [verification, setVerification] = useState<VerificationStatus>({
        email: false, mobile: false, pan: false, aadhar: false,
    });
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [verifyingField, setVerifyingField] = useState<VerificationField | null>(null);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);


    // Payment Methods State (now part of profile)
    
    // Dialog State
    const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
    const [isAddUpiDialogOpen, setIsAddUpiDialogOpen] = useState(false);
    const [isAddERupeeDialogOpen, setIsAddERupeeDialogOpen] = useState(false);
    
    // New Account Form State
    const [newHolderName, setNewHolderName] = useState("");
    const [newAccountNumber, setNewAccountNumber] = useState("");
    const [newIfsc, setNewIfsc] = useState("");
    const [newBankName, setNewBankName] = useState("");
    const [newUpiId, setNewUpiId] = useState("");
    const [newERupeeAddress, setNewERupeeAddress] = useState("");


    useEffect(() => {
        setIsClient(true);
        if (isConnected && address) {
            const fetchProfile = async () => {
                setIsLoadingProfile(true);
                const docRef = doc(db, "p2p_users", address);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as UserProfile & { verification?: VerificationStatus };
                    setProfile({
                        name: data.name || '',
                        nickname: data.nickname || '',
                        email: data.email || '',
                        mobile: data.mobile || '',
                        pan: data.pan || '',
                        aadhar: data.aadhar || '',
                        address: data.address || '',
                        upiId: data.upiId || '',
                        eRupeeAddress: data.eRupeeAddress || '',
                        bankAccounts: data.bankAccounts || []
                    });
                     if (data.verification) {
                        setVerification(data.verification);
                    }
                }
                setIsLoadingProfile(false);
            };
            fetchProfile();
        } else {
             setIsLoadingProfile(false);
        }
    }, [isConnected, address]);
    
    const allDetailsFilled = profile.name && profile.nickname && profile.email && profile.mobile && profile.pan && profile.aadhar && profile.address;
    const allDetailsVerified = verification.email && verification.mobile && verification.pan && verification.aadhar;
    const isP2PVerified = allDetailsFilled && allDetailsVerified;

    const saveProfileData = async (updatedProfile: UserProfile, updatedVerification?: VerificationStatus) => {
        if (!address) return;
        setIsSaving(true);
        try {
            const userRef = doc(db, 'p2p_users', address);
            await setDoc(userRef, {
                ...updatedProfile,
                verification: updatedVerification || verification,
                lastUpdated: serverTimestamp()
            }, { merge: true });
            return true;
        } catch (error) {
            console.error("Error saving profile data: ", error);
            toast({ variant: "destructive", title: "Save Failed", description: "Could not save your data. Please try again." });
            return false;
        } finally {
            setIsSaving(false);
        }
    }


    const handleSaveProfile = async () => {
        const success = await saveProfileData(profile);
        if (success) {
            toast({ title: "Profile Saved!", description: "Your information has been updated." });
            setIsEditing(false);
        }
    }
    
    const handleAddAccount = async () => {
        if (!newHolderName || !newAccountNumber || !newIfsc || !newBankName) {
            toast({ variant: "destructive", title: "Missing Information", description: "Please fill out all bank account fields." });
            return;
        }
        const newAccount: BankAccount = {
            id: `bank_${Date.now()}`,
            holderName: newHolderName,
            accountNumber: newAccountNumber,
            ifsc: newIfsc,
            bankName: newBankName,
        };
        
        const updatedAccounts = [...(profile.bankAccounts || []), newAccount];
        const updatedProfile = { ...profile, bankAccounts: updatedAccounts };
        
        const success = await saveProfileData(updatedProfile);
        if(success) {
            setProfile(updatedProfile);
            toast({ title: "Bank Account Added!", description: "The new bank account has been linked." });
            setIsAddAccountDialogOpen(false);
            setNewHolderName(""); setNewAccountNumber(""); setNewIfsc(""); setNewBankName("");
        }
    };

    const handleAddUpi = async () => {
        if(!newUpiId) {
            toast({ variant: "destructive", title: "UPI ID Required", description: "Please enter a valid UPI ID." });
            return;
        }
        const updatedProfile = { ...profile, upiId: newUpiId };
        const success = await saveProfileData(updatedProfile);
        if (success) {
            setProfile(updatedProfile);
            toast({ title: "UPI ID Added!", description: "Your UPI ID has been linked." });
            setIsAddUpiDialogOpen(false);
            setNewUpiId("");
        }
    }
    
    const handleAddERupee = async () => {
        if(!newERupeeAddress) {
            toast({ variant: "destructive", title: "eRupee Address Required", description: "Please enter a valid eRupee address." });
            return;
        }
        const updatedProfile = { ...profile, eRupeeAddress: newERupeeAddress };
        const success = await saveProfileData(updatedProfile);
        if (success) {
            setProfile(updatedProfile);
            toast({ title: "eRupee Address Added!", description: "Your Digital Rupee address has been linked." });
            setIsAddERupeeDialogOpen(false);
            setNewERupeeAddress("");
        }
    }


    const handleDeleteAccount = async (id: string) => {
        const updatedAccounts = (profile.bankAccounts || []).filter(acc => acc.id !== id);
        const updatedProfile = { ...profile, bankAccounts: updatedAccounts };
        const success = await saveProfileData(updatedProfile);
        if(success) {
            setProfile(updatedProfile);
            toast({ variant: "destructive", title: "Account Removed", description: "The bank account has been unlinked." });
        }
    };
    
    const handleDeleteUpi = async () => {
        const updatedProfile = { ...profile, upiId: "" };
        const success = await saveProfileData(updatedProfile);
        if (success) {
            setProfile(updatedProfile);
            toast({ variant: "destructive", title: "UPI ID Removed" });
        }
    }
    
    const handleDeleteERupee = async () => {
        const updatedProfile = { ...profile, eRupeeAddress: "" };
        const success = await saveProfileData(updatedProfile);
        if(success) {
            setProfile(updatedProfile);
            toast({ variant: "destructive", title: "eRupee Address Removed" });
        }
    }
    
    const handleVerifyClick = (field: VerificationField) => {
        setVerifyingField(field);
        setIsOtpDialogOpen(true);
        // In a real app, you would trigger an API to send an OTP here.
    }

    const handleOtpSubmit = async () => {
        setIsVerifyingOtp(true);
        // Simulate OTP verification
        await new Promise(resolve => setTimeout(resolve, 0));

        if (otp === '123456' && verifyingField) { // Using a dummy OTP
            const updatedVerification = {...verification, [verifyingField]: true};
            const success = await saveProfileData(profile, updatedVerification);
            
            if (success) {
                setVerification(updatedVerification);
                toast({ title: "Verification Successful!", description: `Your ${verifyingField} has been verified.` });
                setIsOtpDialogOpen(false);
            }
        } else {
            toast({ variant: "destructive", title: "Verification Failed", description: "The OTP you entered is incorrect." });
        }
        setIsVerifyingOtp(false);
        setOtp('');
        setVerifyingField(null);
    }


    if (!isClient || isLoadingProfile) {
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
    <>
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
             <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">My Profile & Verification</h1>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                    Complete and verify your profile to get full access to P2P trading and other services.
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
                            {!isEditing && (
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="space-y-1">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} readOnly={!isEditing} />
                                </div>
                                {/* Nickname */}
                                <div className="space-y-1">
                                    <Label htmlFor="nickname">Nickname</Label>
                                    <Input id="nickname" placeholder="e.g. CryptoKing" value={profile.nickname} onChange={(e) => setProfile({...profile, nickname: e.target.value})} readOnly={!isEditing} />
                                </div>
                                {/* Address */}
                                 <div className="space-y-1 md:col-span-2">
                                    <Label htmlFor="address">Full Address</Label>
                                    <Input id="address" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} readOnly={!isEditing} />
                                </div>
                                {/* Email */}
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} readOnly={!isEditing || verification.email} />
                                        {isEditing && !verification.email && <Button variant="outline" size="sm" onClick={() => handleVerifyClick('email')}>Verify</Button>}
                                        {verification.email && <CheckCircle className="h-5 w-5 text-green-500" />}
                                    </div>
                                </div>
                                {/* Mobile */}
                                 <div className="space-y-1">
                                    <Label htmlFor="mobile">Mobile Number</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="mobile" type="tel" value={profile.mobile} onChange={(e) => setProfile({...profile, mobile: e.target.value})} readOnly={!isEditing || verification.mobile} />
                                        {isEditing && !verification.mobile && <Button variant="outline" size="sm" onClick={() => handleVerifyClick('mobile')}>Verify</Button>}
                                        {verification.mobile && <CheckCircle className="h-5 w-5 text-green-500" />}
                                    </div>
                                </div>
                                 {/* PAN */}
                                <div className="space-y-1">
                                    <Label htmlFor="pan">PAN Card Number</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="pan" value={profile.pan} onChange={(e) => setProfile({...profile, pan: e.target.value})} readOnly={!isEditing || verification.pan} />
                                        {isEditing && !verification.pan && <Button variant="outline" size="sm" onClick={() => handleVerifyClick('pan')}>Verify</Button>}
                                        {verification.pan && <CheckCircle className="h-5 w-5 text-green-500" />}
                                    </div>
                                </div>
                                 {/* Aadhar */}
                                <div className="space-y-1">
                                    <Label htmlFor="aadhar">Aadhar Card Number</Label>
                                    <div className="flex items-center gap-2">
                                        <Input id="aadhar" value={profile.aadhar} onChange={(e) => setProfile({...profile, aadhar: e.target.value})} readOnly={!isEditing || verification.aadhar} />
                                        {isEditing && !verification.aadhar && <Button variant="outline" size="sm" onClick={() => handleVerifyClick('aadhar')}>Verify</Button>}
                                        {verification.aadhar && <CheckCircle className="h-5 w-5 text-green-500" />}
                                    </div>
                                </div>
                            </div>
                             {isEditing && (
                                <Alert>
                                    <ShieldCheck className="h-4 w-4" />
                                    <AlertTitle>Your data is secure</AlertTitle>
                                    <AlertDescription>
                                    Your personal information is stored securely and will only be used for identity verification.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                        {isEditing && (
                            <CardFooter className="flex gap-2">
                                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button className="flex-1" onClick={handleSaveProfile} disabled={isSaving}>
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
                            {isP2PVerified ? (
                                <Alert className="border-green-500 text-green-500">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <AlertTitle className="text-green-500">P2P Verified</AlertTitle>
                                    <AlertDescription className="text-green-700">
                                        You are eligible for P2P trading.
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <Alert variant="destructive">
                                    <Loader2 className="h-4 w-4" />
                                    <AlertTitle>Not Verified</AlertTitle>
                                    <AlertDescription>
                                        Please complete and verify all fields in "Your Details" to start P2P trading.
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
                        <CardHeader>
                            <div>
                                <CardTitle className="font-headline text-xl">Payment Methods</CardTitle>
                                <CardDescription>Used for P2P trading.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* UPI */}
                            <div className="flex justify-between items-center">
                                <p className="font-medium">UPI ID</p>
                                <Dialog open={isAddUpiDialogOpen} onOpenChange={setIsAddUpiDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add UPI</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Add New UPI ID</DialogTitle></DialogHeader>
                                        <div className="py-4"><Input placeholder="your-id@okhdfcbank" value={newUpiId} onChange={(e) => setNewUpiId(e.target.value)} /></div>
                                        <DialogFooter><Button onClick={handleAddUpi} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save UPI ID'}</Button></DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                             {profile.upiId ? (
                                <div className="flex justify-between items-center p-3 border rounded-lg bg-muted/20">
                                    <div className="flex items-center gap-3">
                                        <IndianRupee className="h-5 w-5 text-primary" />
                                        <p className="text-sm font-mono">{profile.upiId}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8" onClick={handleDeleteUpi}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                             ) : <p className="text-xs text-center text-muted-foreground">No UPI ID added.</p>}
                             
                            {/* eRupee */}
                            <div className="flex justify-between items-center">
                                <p className="font-medium">Digital Rupee (e₹)</p>
                                <Dialog open={isAddERupeeDialogOpen} onOpenChange={setIsAddERupeeDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add eRupee</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Add Digital Rupee (e₹) Address</DialogTitle></DialogHeader>
                                        <div className="py-4"><Input placeholder="e.g., 9876543210@axiserupee" value={newERupeeAddress} onChange={(e) => setNewERupeeAddress(e.target.value)} /></div>
                                        <DialogFooter><Button onClick={handleAddERupee} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save eRupee Address'}</Button></DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                             {profile.eRupeeAddress ? (
                                <div className="flex justify-between items-center p-3 border rounded-lg bg-muted/20">
                                    <div className="flex items-center gap-3">
                                        <IndianRupee className="h-5 w-5 text-primary" />
                                        <p className="text-sm font-mono">{profile.eRupeeAddress}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8" onClick={handleDeleteERupee}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                             ) : <p className="text-xs text-center text-muted-foreground">No eRupee Address added.</p>}
                            
                            {/* Bank Accounts */}
                            <div className="flex justify-between items-center pt-2">
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
                                        <DialogFooter><Button onClick={handleAddAccount} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Account'}</Button></DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>

                             {(profile.bankAccounts || []).length > 0 ? (profile.bankAccounts || []).map(account => (
                                    <div key={account.id} className="flex justify-between items-center p-3 border rounded-lg bg-muted/20">
                                        <div className="flex items-start gap-3">
                                            <Banknote className="h-5 w-5 text-primary mt-1" />
                                            <div>
                                                <p className="font-semibold text-sm">{account.holderName}</p>
                                                <p className="text-xs text-muted-foreground">{account.bankName}</p>
                                                <p className="text-xs font-mono">{account.accountNumber} / {account.ifsc}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8" onClick={() => handleDeleteAccount(account.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )) : <p className="text-xs text-center text-muted-foreground">No bank accounts added.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

        <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Verify Your {verifyingField?.charAt(0).toUpperCase() + (verifyingField || '').slice(1)}</DialogTitle>
                    <DialogDescription>
                        This is a simulation. An OTP would be sent to your registered {verifyingField}. 
                        Please enter the dummy OTP below to proceed.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" />
                    <p className="text-xs text-muted-foreground">For this demo, please use the OTP: <strong className="text-foreground">123456</strong></p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOtpDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleOtpSubmit} disabled={isVerifyingOtp}>
                        {isVerifyingOtp ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Verifying...</> : 'Submit OTP'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
    );
}
