'use client';

import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

// ========= CONFIG =========
const STAKING_ADDRESS = '0xb80F123d2E5200F1Cb6dEfd428f5aDa543C94E76';
const DECIMALS = 18n;
const SECONDS_PER_YEAR = 31536000n; // 365*24*3600

// Minimal ABI: सिर्फ read के लिए
const STAKING_ABI = [
  'function stakedOf(address) view returns (uint256)',
  'function earned(address) view returns (uint256)',
  'function stakes(address) view returns (uint256 principal, uint128 lastClaim, uint128 accRewards)',
  'function sponsors(address) view returns (address)',
  'function levelOf(address) view returns (uint8)',
  'function levelForAmount(uint256) view returns (uint8)',
  'function tierApyBps(uint256) view returns (uint16)',
];

export default function LiveIncomeTicker() {
  const { address: userAddress } = useAccount();
  const [ready, setReady] = useState(false);
  const [display, setDisplay] = useState({
    amountEgl: '0.000000',
    liveEgl: '0.000000',
    level: 0,
    apyBps: '0',
  });

  // ethers provider + contract
  const contractRef = useRef<ethers.Contract | null>(null);
  const snapshotRef = useRef({
    amount: 0n,
    accrued: 0n,
    lastUpdate: 0n,
    apyBps: 0n,
  });

  // helper: format 18-dec to string
  function format18(x: bigint) {
    const s = x.toString().padStart(19, '0');
    const whole = s.slice(0, -18) || '0';
    const frac = s.slice(-18);
    // limit to 6 decimals for UI
    return `${whole}.${frac.slice(0, 6)}`;
  }

  // local fallback for level (केवल तब जब levelOf/levelForAmount उपलब्‍ध नहीं)
  function localLevelForAmount(amount: bigint) {
    // amount is wei (18 decimals)
    const tok = Number(amount / 10n ** DECIMALS); // rough conversion
    // आपकी default slab ranges (ज़रूरत अनुसार बदल सकते हैं)
    if (tok >= 30000) return 6;
    if (tok >= 10000) return 5;
    if (tok >= 5000) return 4;
    if (tok >= 2000) return 3;
    if (tok >= 500) return 2;
    if (tok >= 50) return 1;
    return 0; // <50 means not valid tier (no APY)
  }

  useEffect(() => {
    (async () => {
      if (!(window as any).ethereum || !userAddress) {
        setReady(false);
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const contract = new ethers.Contract(
        STAKING_ADDRESS,
        STAKING_ABI,
        provider
      );
      contractRef.current = contract;

      // 1) read users(user) -> renamed to stakes(user)
      // principal, lastClaim, accRewards
      const u = await contract.stakes(userAddress);
      const amount = BigInt(u.principal.toString());
      const accrued = BigInt(u.accRewards.toString());
      const lastUpdate = BigInt(u.lastClaim.toString());

      // 2) resolve level
      let level = 0;
      try {
        // prefer direct
        level = Number(await contract.levelOf(userAddress));
      } catch {}
      if (!level) {
        try {
          level = Number(await contract.levelForAmount(amount));
        } catch {}
      }
      if (!level) {
        level = localLevelForAmount(amount);
      }

      // 3) read apy bps for that level
      let apyBps = 0n;
      if (level > 0) {
        try {
          // Assuming tierApyBps uses index from 0, level from 1
          apyBps = BigInt((await contract.tierApyBps(level -1)).toString());
        } catch(e) {
          console.error("Could not fetch APY", e)
          apyBps = 0n;
        }
      }

      snapshotRef.current = { amount, accrued, lastUpdate, apyBps };

      setDisplay({
        amountEgl: format18(amount),
        liveEgl: format18(accrued), // start with stored
        level,
        apyBps: apyBps.toString(),
      });
      setReady(true);
    })();
  }, [userAddress]);

  // ticker – हर 1 सेकंड में live income बढ़ाएँ (off-chain calc)
  useEffect(() => {
    if (!ready || !userAddress) return;
    const t = setInterval(() => {
      const now = BigInt(Math.floor(Date.now() / 1000));
      const { amount, accrued, lastUpdate, apyBps } = snapshotRef.current;
      
      let live = accrued;
      if (apyBps > 0n && amount > 0n && now > lastUpdate && lastUpdate > 0n) {
        const dt = now - lastUpdate; // seconds
        // earned = amount * apyBps * dt / (10000 * secondsPerYear)
        const num = amount * apyBps * dt;
        const den = 10000n * SECONDS_PER_YEAR;
        live = accrued + num / den;
      }

      setDisplay((prev) => ({ ...prev, liveEgl: format18(live) }));
    }, 1000);

    return () => clearInterval(t);
  }, [ready, userAddress]);
  
  if (!userAddress) {
      return null;
  }

  return (
    <Card className="bg-primary/10 border-primary">
       <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl">Available to Claim</CardTitle>
        <CardDescription>This is the amount of rewards you can claim right now, updated live.</CardDescription>
       </CardHeader>
       <CardContent className="text-center">
            <div className="text-4xl font-bold mb-2">{display.liveEgl}</div>
            <p className="text-sm text-primary/80">EGLIFE</p>
            <div className="text-xs text-muted-foreground mt-2">
                Staked: {display.amountEgl} | Level: {display.level} | APY (bps): {display.apyBps}
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

