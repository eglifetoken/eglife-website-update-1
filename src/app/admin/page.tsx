
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAccount, useConnect, useReadContract, useWriteContract, useChainId } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState, useEffect, Suspense } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, AlertTriangle, Wallet, Settings, Pause, Play } from "lucide-react";
import { bsc } from "wagmi/chains";
import { type BaseError, parseEther, formatEther } from "viem";

const EGLIFE_STAKING_CONTRACT = '0xb80F123d2E5200F1Cb6dEfd428f5aDa543C94E76'; 
const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"newPenaltyBps","type":"uint16"}],"name":"EarlyUnstakePenaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newLockPeriod","type":"uint256"}],"name":"LockPeriodUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"maxPayoutBps","type":"uint16"}],"name":"MaxReferralPayoutUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStake","type":"uint256"}],"name":"MinActiveStakeForReferralUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusAmount","type":"uint256"}],"name":"ReferralBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"ReferralBonusesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"royaltyBps","type":"uint16"}],"name":"RoyaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"SponsorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netStaked","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"indexed":false,"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"TiersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"TreasuryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"unstakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"},{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"SponsorUpdated","type":"event"},{"inputs":[],"name":"BPS_DENOMINATOR","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"address[]","name":"newSponsors","type":"address[]"}],"name":"batchUpdateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTierCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTiers","outputs":[{"internalType":"uint128[]","name":"mins","type":"uint128[]"},{"internalType":"uint16[]","name":"apys","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReferralPayoutBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"setReferralBonuses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint16","name":"bps","type":"uint16"}],"name":"setReferralBonusForLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLock","type":"uint256"}],"name":"setLockPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_max","type":"uint16"}],"name":"setMaxReferralPayoutBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_royaltyBps","type":"uint16"}],"name":"setRoyaltyBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"setTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint128","name":"lastClaim","type":"uint128"},{"internalType":"uint128","name":"accRewards","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierApyBps","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierMinAmount","outputs":[{"internalType":"uint128[]","name":"","type":"uint128[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"updateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function AdminPageContent() {
    const { toast } = useToast();
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { writeContractAsync } = useWriteContract();
    const chainId = useChainId();
    const [isClient, setIsClient] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // State for inputs
    const [lockPeriodDays, setLockPeriodDays] = useState("");
    const [tierMins, setTierMins] = useState("");
    const [tierApys, setTierApys] = useState("");

    useEffect(() => { setIsClient(true) }, []);

    // Read contract state
    const { data: ownerAddress, isLoading: isLoadingOwner } = useReadContract({
        abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'owner', query: { enabled: isConnected }
    });

    const { data: contractStatus, refetch: refetchStatus } = useReadContract({
        abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'paused', query: { enabled: isConnected }
    });

    const { data: currentLockPeriod, refetch: refetchLockPeriod } = useReadContract({
        abi: stakingContractAbi, address: EGLIFE_STAKING_CONTRACT, functionName: 'lockPeriod', query: { enabled: isConnected }
    });

    const isOwner = isConnected && address && ownerAddress && address.toLowerCase() === ownerAddress.toLowerCase();

    const handleError = (error: any, title: string) => {
        let message = "An unknown error occurred.";
        if (typeof error === 'object' && error !== null) {
            if ('shortMessage' in error) message = (error as BaseError).shortMessage;
            else if ('message' in error) message = error.message;
        }
        toast({ variant: "destructive", title: title, description: message });
        setIsProcessing(false);
    }
    
    const handleAction = async (action: () => Promise<any>, successMessage: string, errorMessage: string) => {
        setIsProcessing(true);
        try {
            await action();
            toast({ title: "Success", description: successMessage });
        } catch (e) {
            handleError(e, errorMessage);
        } finally {
            setIsProcessing(false);
        }
    }

    const togglePause = async () => {
        const action = contractStatus ? 'unpause' : 'pause';
        await handleAction(
            () => writeContractAsync({ address: EGLIFE_STAKING_CONTRACT, abi: stakingContractAbi, functionName: action, args: [] }),
            `Contract successfully ${action}d.`,
            `Failed to ${action} contract.`
        );
        refetchStatus();
    }

    const handleSetLockPeriod = async () => {
        if (!lockPeriodDays || parseInt(lockPeriodDays) <= 0) {
            toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid number of days." });
            return;
        }
        const lockPeriodInSeconds = BigInt(parseInt(lockPeriodDays) * 86400);
        await handleAction(
            () => writeContractAsync({ address: EGLIFE_STAKING_CONTRACT, abi: stakingContractAbi, functionName: 'setLockPeriod', args: [lockPeriodInSeconds] }),
            `Lock period updated to ${lockPeriodDays} days.`,
            `Failed to update lock period.`
        );
        refetchLockPeriod();
        setLockPeriodDays("");
    }
    
    const handleSetTiers = async () => {
        try {
            const minAmounts = tierMins.split(',').map(s => s.trim()).filter(Boolean).map(m => parseEther(m));
            const apyBps = tierApys.split(',').map(s => s.trim()).filter(Boolean).map(a => parseInt(a));

            if (minAmounts.length === 0 || apyBps.length === 0 || minAmounts.length !== apyBps.length) {
                toast({ variant: "destructive", title: "Invalid Input", description: "Minimum amounts and APYs must have a matching number of entries." });
                return;
            }
             await handleAction(
                () => writeContractAsync({ address: EGLIFE_STAKING_CONTRACT, abi: stakingContractAbi, functionName: 'setTiers', args: [minAmounts, apyBps] }),
                'Staking tiers have been successfully updated.',
                'Failed to update staking tiers.'
            );
        } catch(e) {
             handleError(e, 'Tier Update Failed');
        }
    }


    if (!isClient || isLoadingOwner) {
        return <div className="flex h-[calc(100vh-10rem)] items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
    }

    if (!isConnected) {
        return (
            <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <Wallet className="h-12 w-12 mx-auto text-primary" />
                        <CardTitle>Connect Wallet</CardTitle>
                        <CardDescription>Please connect your wallet to access the admin panel.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => connect({ connector: injected() })} className="w-full">Connect Wallet</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    if (!isOwner) {
        return (
             <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Card className="w-full max-w-md text-center border-destructive">
                    <CardHeader>
                        <AlertTriangle className="h-12 w-12 mx-auto text-destructive" />
                        <CardTitle className="text-destructive">Access Denied</CardTitle>
                        <CardDescription>Only the contract owner can access this page.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Your address: <span className="font-mono">{address}</span></p>
                    </CardContent>
                </Card>
            </div>
        )
    }


    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold flex items-center justify-center gap-4"><Shield className="h-10 w-10"/>Admin Panel</h1>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">Manage the EGLIFE Staking Contract settings.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Contract Status</CardTitle>
                        <CardDescription>Pause or unpause all staking and unstaking functions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant={contractStatus ? 'destructive' : 'default'}>
                            <AlertTitle>{contractStatus ? 'Contract is Paused' : 'Contract is Active'}</AlertTitle>
                            <AlertDescription>{contractStatus ? 'All state-changing functions are currently disabled.' : 'All functions are operating normally.'}</AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={togglePause} disabled={isProcessing} variant={contractStatus ? 'default' : 'destructive'} className="w-full">
                           {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : contractStatus ? <Play className="mr-2 h-4 w-4"/> : <Pause className="mr-2 h-4 w-4"/>}
                           {contractStatus ? 'Activate Contract' : 'Pause Contract'}
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Update Lock Period</CardTitle>
                        <CardDescription>Set the staking lock-in period in days. Current: <strong>{currentLockPeriod ? (Number(currentLockPeriod) / 86400).toString() : '...'} days</strong></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="lock-period">New Lock Period (Days)</Label>
                            <Input id="lock-period" type="number" placeholder="e.g., 365" value={lockPeriodDays} onChange={e => setLockPeriodDays(e.target.value)} disabled={isProcessing}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSetLockPeriod} disabled={isProcessing} className="w-full">
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Update Lock Period
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Update Staking Tiers</CardTitle>
                        <CardDescription>Set the minimum staking amounts and their corresponding APY in basis points (BPS). 100 BPS = 1%.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="tier-mins">Minimum Amounts (comma-separated)</Label>
                            <Input id="tier-mins" placeholder="e.g., 50, 500, 2000" value={tierMins} onChange={e => setTierMins(e.target.value)} disabled={isProcessing}/>
                             <p className="text-xs text-muted-foreground">The minimum EGLIFE required to enter each tier.</p>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="tier-apys">APYs in BPS (comma-separated)</Label>
                            <Input id="tier-apys" placeholder="e.g., 10000, 12500, 15000" value={tierApys} onChange={e => setTierApys(e.target.value)} disabled={isProcessing}/>
                            <p className="text-xs text-muted-foreground">Yearly returns for each tier. 100% APY = 10000 BPS.</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSetTiers} disabled={isProcessing} className="w-full">
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Update Tiers
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default function AdminPage() {
    return (
        <Suspense fallback={<div className="flex h-[calc(100vh-10rem)] items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <AdminPageContent />
        </Suspense>
    )
}


    