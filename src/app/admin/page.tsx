
"use client";

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useReadContract, useChainId, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { bsc } from 'wagmi/chains';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wallet, Settings, Loader2, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { formatEther } from 'viem';

const EGLIFE_STAKING_CONTRACT = "0x90B374f87726F172504501c0B91eeEbadB5FE230";

const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"newPenaltyBps","type":"uint16"}],"name":"EarlyUnstakePenaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newLockPeriod","type":"uint256"}],"name":"LockPeriodUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"maxPayoutBps","type":"uint16"}],"name":"MaxReferralPayoutUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStake","type":"uint256"}],"name":"MinActiveStakeForReferralUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusAmount","type":"uint256"}],"name":"ReferralBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"ReferralBonusesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"royaltyBps","type":"uint16"}],"name":"RoyaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"SponsorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netStaked","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"indexed":false,"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"TiersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"TreasuryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"unstakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"},{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"SponsorUpdated","type":"event"},{"inputs":[],"name":"BPS_DENOMINATOR","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"address[]","name":"newSponsors","type":"address[]"}],"name":"batchUpdateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTierCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTiers","outputs":[{"internalType":"uint128[]","name":"mins","type":"uint128[]"},{"internalType":"uint16[]","name":"apys","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReferralPayoutBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"setReferralBonuses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint16","name":"bps","type":"uint16"}],"name":"setReferralBonusForLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLock","type":"uint256"}],"name":"setLockPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_max","type":"uint16"}],"name":"setMaxReferralPayoutBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_royaltyBps","type":"uint16"}],"name":"setRoyaltyBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"setTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint128","name":"lastClaim","type":"uint128"},{"internalType":"uint128","name":"accRewards","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierApyBps","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierMinAmount","outputs":[{"internalType":"uint128[]","name":"","type":"uint128[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"updateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"}];


const DataCard = ({ title, data, isLoading }: { title: string, data: any, isLoading: boolean }) => (
    <div className="p-4 border rounded-lg bg-muted/20">
        <p className="text-sm text-muted-foreground">{title}</p>
        {isLoading ? (
            <Loader2 className="h-5 w-5 mt-1 animate-spin" />
        ) : (
            <p className="font-mono text-sm break-all mt-1">{data}</p>
        )}
    </div>
);

export default function AdminPage() {
    const [isClient, setIsClient] = useState(false);
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const chainId = useChainId();
    const { switchChain } = useSwitchChain();
    const isWrongNetwork = isConnected && chainId !== bsc.id;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { data: owner, isLoading: isLoadingOwner } = useReadContract({
        abi: stakingContractAbi,
        address: EGLIFE_STAKING_CONTRACT,
        functionName: 'owner',
        query: { enabled: !!address && !isWrongNetwork }
    });

    const { data: totalStaked, isLoading: isLoadingTotalStaked } = useReadContract({
        abi: stakingContractAbi,
        address: EGLIFE_STAKING_CONTRACT,
        functionName: 'totalStaked',
        query: { enabled: !!address && !isWrongNetwork, refetchInterval: 10000 }
    });
    
    const { data: treasury, isLoading: isLoadingTreasury } = useReadContract({
        abi: stakingContractAbi,
        address: EGLIFE_STAKING_CONTRACT,
        functionName: 'treasury',
        query: { enabled: !!address && !isWrongNetwork }
    });

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
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <Wallet className="h-12 w-12 mx-auto text-primary mb-4" />
                        <CardTitle>Connect Your Wallet</CardTitle>
                        <CardDescription>You need to connect your wallet to view the admin dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => connect({ connector: injected({ shimDisconnect: true }) })}>
                            <LinkIcon className="mr-2 h-4 w-4" /> Connect Wallet
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const isOwner = isConnected && owner && address === owner;

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Admin Dashboard</h1>
                <p className="text-lg text-foreground/80 mt-4 max-w-3xl mx-auto">
                    Live overview of the EGLIFE staking contract.
                </p>
            </div>

            {isWrongNetwork && (
                <Alert variant="destructive" className="mb-8">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Wrong Network</AlertTitle>
                <AlertDescription>
                    Please switch to the BNB Smart Chain to view contract data.
                    <Button onClick={() => switchChain({ chainId: bsc.id })} variant="link" className="p-0 h-auto ml-2 text-white">
                        Switch to BSC
                    </Button>
                </AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Settings className="h-6 w-6 text-primary"/>
                        <CardTitle className="font-headline text-2xl">Contract State</CardTitle>
                    </div>
                    <CardDescription>
                        This data is read directly from the blockchain.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <DataCard title="Contract Owner" data={owner} isLoading={isLoadingOwner} />
                    <DataCard title="Treasury Wallet" data={treasury} isLoading={isLoadingTreasury} />
                    <DataCard title="Total EGLIFE Staked" data={totalStaked ? `${parseFloat(formatEther(totalStaked as bigint)).toLocaleString()} EGLIFE` : '0'} isLoading={isLoadingTotalStaked} />
                </CardContent>
            </Card>

            {!isOwner && (
                 <Alert className="mt-8">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Read-Only Access</AlertTitle>
                    <AlertDescription>
                       You are viewing this page in read-only mode. Only the contract owner can perform administrative actions.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}
