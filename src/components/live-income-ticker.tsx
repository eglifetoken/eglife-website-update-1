
'use client';

import { useEffect, useRef, useState } from 'react';
import { useAccount, useReadContract, useChainId } from 'wagmi';
import { formatEther } from 'viem';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { bsc } from 'wagmi/chains';

// ========= CONFIG =========
const STAKING_ADDRESS = '0xDe9C5F534D13145e965336acf21eE6B36378D7aA';
const DECIMALS = 18n;
const SECONDS_PER_YEAR = 31536000n; // 365*24*3600

const stakingContractAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"initialOwner","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"newPenaltyBps","type":"uint16"}],"name":"EarlyUnstakePenaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newLockPeriod","type":"uint256"}],"name":"LockPeriodUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"maxPayoutBps","type":"uint16"}],"name":"MaxReferralPayoutUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStake","type":"uint256"}],"name":"MinActiveStakeForReferralUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusAmount","type":"uint256"}],"name":"ReferralBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"ReferralBonusesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"royaltyBps","type":"uint16"}],"name":"RoyaltyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"SponsorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netStaked","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"indexed":false,"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"TiersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"TreasuryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"unstakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardsPaid","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"},{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"SponsorUpdated","type":"event"},{"inputs":[],"name":"BPS_DENOMINATOR","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"address[]","name":"newSponsors","type":"address[]"}],"name":"batchUpdateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTierCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTiers","outputs":[{"internalType":"uint128[]","name":"mins","type":"uint128[]"},{"internalType":"uint16[]","name":"apys","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReferralPayoutBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"royaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[10]","name":"levelsBps","type":"uint16[10]"}],"name":"setReferralBonuses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint16","name":"bps","type":"uint16"}],"name":"setReferralBonusForLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLock","type":"uint256"}],"name":"setLockPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_max","type":"uint16"}],"name":"setMaxReferralPayoutBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_royaltyBps","type":"uint16"}],"name":"setRoyaltyBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128[]","name":"minAmounts","type":"uint128[]"},{"internalType":"uint16[]","name":"apyBps","type":"uint16[]"}],"name":"setTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint128","name":"lastClaim","type":"uint128"},{"internalType":"uint128","name":"accRewards","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierApyBps","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tierMinAmount","outputs":[{"internalType":"uint128[]","name":"","type":"uint128[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"updateSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"}];


export default function LiveIncomeTicker() {
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const [ready, setReady] = useState(false);
  const [liveEgl, setLiveEgl] = useState('0.000000');

  const { data: stakeData } = useReadContract({
    abi: stakingContractAbi,
    address: STAKING_ADDRESS,
    functionName: 'stakedOf',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress && chainId === bsc.id }
  });

  const { data: earnedData } = useReadContract({
    abi: stakingContractAbi,
    address: STAKING_ADDRESS,
    functionName: 'earned',
    args: userAddress ? [userAddress] : undefined,
    query: { 
        enabled: !!userAddress && chainId === bsc.id,
        refetchInterval: 5000, // Keep fetching on-chain earned data
    }
  });
  
  const stakedAmount = stakeData ? parseFloat(formatEther(stakeData as bigint)) : 0;
  const earnedAmount = earnedData ? parseFloat(formatEther(earnedData as bigint)) : 0;

  useEffect(() => {
    // This effect simply updates the UI whenever the on-chain data changes.
    // The real-time ticker logic has been removed as it was complex and potentially inaccurate.
    // Wagmi's refetchInterval provides a good balance of liveness and simplicity.
    setLiveEgl(earnedAmount.toFixed(6));
  }, [earnedAmount]);

  if (!userAddress || !stakeData) {
      return null;
  }

  return (
    <Card className="bg-primary/10 border-primary">
       <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl">Available to Claim</CardTitle>
        <CardDescription>This is the amount of rewards you can claim right now, updated periodically.</CardDescription>
       </CardHeader>
       <CardContent className="text-center">
            <div className="text-4xl font-bold mb-2">{liveEgl}</div>
            <p className="text-sm text-primary/80">EGLIFE</p>
            <div className="text-xs text-muted-foreground mt-2">
                Staked: {stakedAmount.toFixed(2)} EGLIFE
            </div>
       </CardContent>
       <CardFooter className="flex-col gap-2">
            <Button size="lg" disabled>
                Claim Rewards
            </Button>
            <p className="text-xs text-muted-foreground">Claim button is temporarily disabled. Please use the one below.</p>
       </CardFooter>
    </Card>
  );
}
