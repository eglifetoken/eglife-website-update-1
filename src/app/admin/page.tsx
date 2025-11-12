
"use client";

import React from "react";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { createPublicClient, http, formatEther } from "viem";
import { bsc } from "viem/chains";
import { useAccount, useWalletClient } from "wagmi";

/**
 * EGLIFE Staking – Dynamic Dashboard (React + Tailwind)
 * ----------------------------------------------------
 * How to use:
 * <EGLifeStakingDashboard data={dashboardData} />
 *
 * You can hydrate `dashboardData` from an API/Firebase/JSON file.
 * Numbers below are already human-readable (token units, not wei).
 */

export type Address = `0x${string}`;

export type DashboardData = {
  network: string;
  tokenAddress: Address;
  stakingContract: Address;
  paused: boolean;
  lockPeriodSeconds: number; // e.g., 31536000
  earlyUnstakePenaltyBps: number; // e.g., 1000 => 10%
  totalStaked: number; // in EGLIFE tokens
  useTieredAPR: boolean;
  aprBpsForExampleStake: number; // e.g., 25000 => 25%
  exampleStakeAmount: number; // in EGLIFE tokens (for which APR BPS above applies)

  // wallets
  defaultSponsor: Address;
  referralWallet: Address;
  rewardsWallet: Address;
  treasury: Address;

  // referral / sponsor config
  minActiveStakeForReferral: number; // tokens
  purchaseSponsorBonusAmount: number; // tokens
  stakingSponsorBonusAmount: number; // tokens

  // (optional) level rules example
  levelRules?: {
    level: number;
    selfMin: number; // tokens
    selfMax: number; // tokens
    minA: number;
    minB: number;
    minC: number;
  };

  // example user block (optional)
  exampleUser?: {
    address: Address;
    activated: boolean;
    stakedBalance: number; // tokens
    directCount: number;
    firstStakeTime?: number; // unix
    lastAccrual?: number; // unix
    earned?: number; // tokens
    sponsor?: Address;
    sponsorPurchaseBonusPaid?: boolean;
    sponsorStakeBonusPaid?: boolean;
  };
};

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{children}</span>;
}

function Value({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium text-slate-900 break-all">{children}</span>;
}

function AddressBadge({ addr }: { addr: Address }) {
  const short = `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  return (
    <a
      href={`https://bscscan.com/address/${addr}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-medium hover:shadow-sm"
      title={addr}
    >
      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
      {short}
    </a>
  );
}

function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm bg-white">
      <div className="flex items-start justify-between">
        <Label>{label}</Label>
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="grid grid-cols-5 items-center gap-3 py-2">
      <div className="col-span-2 text-sm text-slate-600">{k}</div>
      <div className="col-span-3 text-sm font-medium text-slate-900 break-words">{v}</div>
    </div>
  );
}

function secondsToDhms(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

function bpsToPct(bps: number) {
  return (bps / 100).toFixed(2) + "%";
}

function EGLifeStakingDashboard({ data }: { data: DashboardData }) {
  const days = Math.round(data.lockPeriodSeconds / 86400);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">EGLIFE Staking – Contract Dashboard</h1>
        <p className="text-slate-600">Live, dynamic values suitable for admin or public display.</p>
      </header>

      {/* Top stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat label="Total Staked" value={<>{data.totalStaked.toLocaleString()} <span className="text-base font-normal">EGLIFE</span></>} />
        <Stat label="Base APR (example)" value={bpsToPct(data.aprBpsForExampleStake)} hint={`Applies at ${data.exampleStakeAmount.toLocaleString()} EGLIFE`} />
        <Stat label="Lock Period" value={`${days} days`} hint={secondsToDhms(data.lockPeriodSeconds)} />
      </div>

      {/* Addresses */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <Label>Contract & Network</Label>
            <span className={`rounded-full px-2 py-1 text-xs ${data.paused ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
              {data.paused ? "Paused" : "Active"}
            </span>
          </div>
          <Row k="Network" v={data.network} />
          <Row k="Token Address" v={<AddressBadge addr={data.tokenAddress} />} />
          <Row k="Staking Contract" v={<AddressBadge addr={data.stakingContract} />} />
          <Row k="Tiered APR" v={data.useTieredAPR ? "Enabled" : "Disabled"} />
          <Row k="Early Unstake Penalty" v={bpsToPct(data.earlyUnstakePenaltyBps)} />
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-3">
            <Label>Wallets</Label>
          </div>
          <Row k="Default Sponsor" v={<AddressBadge addr={data.defaultSponsor} />} />
          <Row k="Referral Wallet" v={<AddressBadge addr={data.referralWallet} />} />
          <Row k="Rewards Wallet" v={<AddressBadge addr={data.rewardsWallet} />} />
          <Row k="Treasury" v={<AddressBadge addr={data.treasury} />} />
        </div>
      </div>

      {/* Referral & Bonus */}
      <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-3">
          <Label>Referral & Bonuses</Label>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Stat label="Min Stake for Referral" value={<>{data.minActiveStakeForReferral.toLocaleString()} <span className="text-base font-normal">EGLIFE</span></>} />
          <Stat label="Purchase Sponsor Bonus" value={<>{data.purchaseSponsorBonusAmount} <span className="text-base font-normal">EGLIFE</span></>} />
          <Stat label="Staking Sponsor Bonus" value={<>{data.stakingSponsorBonusAmount} <span className="text-base font-normal">EGLIFE</span></>} />
        </div>
      </div>

      {/* Level Rules Example */}
      {data.levelRules && (
        <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-3">
            <Label>Level Rules – Example (Level {data.levelRules.level})</Label>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <Stat label="Self Min" value={`${data.levelRules.selfMin.toLocaleString()} EGLIFE`} />
            <Stat label="Self Max" value={`${data.levelRules.selfMax.toLocaleString()} EGLIFE`} />
            <Stat label="Min A" value={data.levelRules.minA} />
            <Stat label="Min B" value={data.levelRules.minB} />
            <Stat label="Min C" value={data.levelRules.minC} />
          </div>
        </div>
      )}

      {/* Example user card (optional) */}
      {data.exampleUser && (
        <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <Label>Example User</Label>
            <span className={`rounded-full px-2 py-1 text-xs ${data.exampleUser.activated ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
              {data.exampleUser.activated ? "Activated" : "Not Activated"}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Row k="User Address" v={<AddressBadge addr={data.exampleUser.address} />} />
            <Row k="Sponsor" v={data.exampleUser.sponsor ? <AddressBadge addr={data.exampleUser.sponsor} /> : "—"} />
            <Row k="Staked Balance" v={`${data.exampleUser.stakedBalance.toLocaleString()} EGLIFE`} />
            <Row k="Direct Count" v={data.exampleUser.directCount} />
            <Row k="Earned (unclaimed)" v={`${(data.exampleUser.earned ?? 0).toLocaleString()} EGLIFE`} />
            <Row k="First Stake" v={data.exampleUser.firstStakeTime ? new Date(data.exampleUser.firstStakeTime * 1000).toLocaleString() : "—"} />
            <Row k="Last Accrual" v={data.exampleUser.lastAccrual ? new Date(data.exampleUser.lastAccrual * 1000).toLocaleString() : "—"} />
            <Row k="Sponsor Bonus – Purchase" v={data.exampleUser.sponsorPurchaseBonusPaid ? "Paid" : "Pending"} />
            <Row k="Sponsor Bonus – Staking" v={data.exampleUser.sponsorStakeBonusPaid ? "Paid" : "Pending"} />
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-xs text-slate-500">
        Tip: Supply this component with fresh data from your backend or directly from chain calls to render a live dashboard.
      </footer>
    </div>
  );
}


// --- Firebase init (frontend-safe; apiKey is OK to expose) ---
const firebaseConfig = {
  apiKey: "AIzaSyD7siVG6oM8wOTGL0ZOlzqJsNsFDUF7sl0",
  authDomain: "eglife-token-1e4c5.firebaseapp.com",
  projectId: "eglife-token-1e4c5",
  storageBucket: "eglife-token-1e4c5.firebasestorage.app",
  messagingSenderId: "321177983654",
  appId: "1:321177983654:web:fcb2a47126845d22117267",
  measurementId: "G-Y681N12MWG",
};

function getDb() {
  const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  return getFirestore(app);
}

// --- Hook: live Firestore subscription → DashboardData ---

export function useDashboardFromFirestore(docId: string = "eglifestaking") {
  const [data, setData] = useState<Partial<DashboardData> | null>(null);
  useEffect(() => {
    const db = getDb();
    const ref = doc(db, "dashboard", docId);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setData(snap.data() as Partial<DashboardData>);
      }
    });
    return unsub;
  }, [docId]);
  return data;
}

// --- viem (on-chain) multi-read for core contract values ---

// Minimal ABI: only the read functions we need for the dashboard
const STAKING_ABI = [
  { "type": "function", "name": "totalStaked", "stateMutability": "view", "inputs": [], "outputs": [{"type":"uint256"}] },
  { "type": "function", "name": "lockPeriod", "stateMutability": "view", "inputs": [], "outputs": [{"type":"uint256"}] },
  { "type": "function", "name": "earlyUnstakePenaltyBps", "stateMutability": "view", "inputs": [], "outputs": [{"type":"uint16"}] },
  // { "type": "function", "name": "useTieredAPR", "stateMutability": "view", "inputs": [], "outputs": [{"type":"bool"}] },
  { "type": "function", "name": "paused", "stateMutability": "view", "inputs": [], "outputs": [{"type":"bool"}] },
  // { "type": "function", "name": "defaultSponsor", "stateMutability": "view", "inputs": [], "outputs": [{"type":"address"}] },
  // { "type": "function", "name": "referralWallet", "stateMutability": "view", "inputs": [], "outputs": [{"type":"address"}] },
  // { "type": "function", "name": "rewardsWallet", "stateMutability": "view", "inputs": [], "outputs": [{"type":"address"}] },
  { "type": "function", "name": "treasury", "stateMutability": "view", "inputs": [], "outputs": [{"type":"address"}] },
  { "type": "function", "name": "minActiveStakeForReferral", "stateMutability": "view", "inputs": [], "outputs": [{"type":"uint256"}] },
  // { "type": "function", "name": "purchaseSponsorBonusAmount", "stateMutability": "view", "inputs": [], "outputs": [{"type":"uint256"}] },
  // { "type": "function", "name": "stakingSponsorBonusAmount", "stateMutability": "view", "inputs": [], "outputs": [{"type":"uint256"}] },
  // { "type": "function", "name": "_aprBpsForStake", "stateMutability": "view", "inputs": [{"type":"uint256","name":"amt"}], "outputs": [{"type":"uint16"}] },
  // Example user reads
  { "type": "function", "name": "stakedOf", "stateMutability": "view", "inputs": [{"type":"address"}], "outputs": [{"type":"uint256"}] },
  { "type": "function", "name": "earned", "stateMutability": "view", "inputs": [{"type":"address"}], "outputs": [{"type":"uint256"}] },
  // { "type": "function", "name": "directCount", "stateMutability": "view", "inputs": [{"type":"address"}], "outputs": [{"type":"uint256"}] },
  { "type": "function", "name": "sponsors", "stateMutability": "view", "inputs": [{"type":"address"}], "outputs": [{"type":"address"}] },
  { "type": "function", "name": "stakes", "stateMutability": "view", "inputs": [{"type":"address"}], "outputs": [{"name":"principal","type":"uint256"},{"name":"lastClaim","type":"uint128"},{"name":"accRewards","type":"uint128"}] },
] as const;

export type OnchainOpts = {
  stakingAddress: Address;
  exampleStakeAmount?: bigint; // in wei (18 decimals)
  exampleUser?: Address;
};

export function useDashboardFromChain(opts: OnchainOpts) {
  const [data, setData] = useState<Partial<DashboardData> | null>(null);

  useEffect(() => {
    const client = createPublicClient({ chain: bsc, transport: http() });
    const contract = { address: opts.stakingAddress as `0x${string}`, abi: STAKING_ABI } as const;

    (async () => {
      try {
        const toToken = (wei: bigint) => Number(wei) / 1e18;
        // Core reads
        const results = await client.multicall({
          contracts: [
            { ...contract, functionName: "totalStaked" },
            { ...contract, functionName: "lockPeriod" },
            { ...contract, functionName: "earlyUnstakePenaltyBps" },
            { ...contract, functionName: "paused" },
            { ...contract, functionName: "treasury" },
            { ...contract, functionName: "minActiveStakeForReferral" },
          ],
        });

        const [
          totalStakedWei,
          lockPeriod,
          earlyBps,
          paused,
          treasury,
          minActiveRefWei,
        ] = results.map(r => r.result);

        // APR for example stake (default 300k EGLIFE)
        const exampleAmtWei = opts.exampleStakeAmount ?? (300_000n * 10n ** 18n);
        // const aprBps = await client.readContract({
        //   ...contract,
        //   functionName: "_aprBpsForStake",
        //   args: [exampleAmtWei],
        // });


        const partial: Partial<DashboardData> = {
          totalStaked: toToken(totalStakedWei as bigint),
          lockPeriodSeconds: Number(lockPeriod as bigint),
          earlyUnstakePenaltyBps: Number(earlyBps as number),
          paused: Boolean(paused),
          treasury: treasury as Address,
          minActiveStakeForReferral: toToken(minActiveRefWei as bigint),
          // aprBpsForExampleStake: Number(aprBps),
          // exampleStakeAmount: Number(exampleAmtWei / 10n ** 18n),
        };

        // Optional example user
        if (opts.exampleUser) {
          const user = opts.exampleUser;
          const userResults = await client.multicall({
            contracts: [
              { ...contract, functionName: "stakedOf", args: [user] },
              { ...contract, functionName: "earned", args: [user] },
              { ...contract, functionName: "sponsors", args: [user] },
              { ...contract, functionName: "stakes", args: [user] },
            ],
          });
          const [stakedWei, earnedWei, sponsor, stakeInfo] = userResults.map(r => r.result);

          partial.exampleUser = {
            address: user,
            activated: (stakedWei as bigint) > 0n,
            stakedBalance: toToken(stakedWei as bigint),
            directCount: 0, // Not available on contract
            firstStakeTime: stakeInfo ? Number((stakeInfo as any).lastClaim) : undefined, // Using lastClaim as proxy
            lastAccrual: stakeInfo ? Number((stakeInfo as any).lastClaim) : undefined,
            earned: toToken(earnedWei as bigint),
            sponsor: sponsor as Address,
          };
        }

        setData(partial);
      } catch (e) {
        console.error("on-chain read failed", e);
      }
    })();
  }, [opts.stakingAddress, opts.exampleStakeAmount, opts.exampleUser]);

  return data;
}

// --- Glue hook: merge Firestore + On-chain (on-chain wins; Firestore fills gaps) ---
export function useMergedDashboard(opts: OnchainOpts & { docId?: string }) {
  const fs = useDashboardFromFirestore(opts?.docId);
  const oc = useDashboardFromChain(opts);
  const [merged, setMerged] = useState<DashboardData | null>(null);

  useEffect(() => {
    const base: Partial<DashboardData> = {
      network: "BNB Smart Chain (Mainnet)",
      tokenAddress: "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113",
      stakingContract: opts.stakingAddress,
      // Provide default fallbacks for values not on-chain
      useTieredAPR: true,
      aprBpsForExampleStake: 25000,
      exampleStakeAmount: 300000,
      defaultSponsor: "0x0000000000000000000000000000000000000000",
      referralWallet: "0x0000000000000000000000000000000000000000",
      rewardsWallet: "0x0000000000000000000000000000000000000000",
      purchaseSponsorBonusAmount: 10,
      stakingSponsorBonusAmount: 10,
    };
    const combine = { ...base, ...(fs ?? {}), ...(oc ?? {}) } as DashboardData;
    setMerged(combine);
  }, [fs, oc, opts.stakingAddress]);

  return merged;
}

const ERC20_ABI = [
  { "type": "function", "name": "allowance", "stateMutability": "view", "inputs": [{"type":"address"},{"type":"address"}], "outputs": [{"type":"uint256"}] },
  { "type": "function", "name": "approve",   "stateMutability": "nonpayable", "inputs": [{"type":"address"},{"type":"uint256"}], "outputs": [{"type":"bool"}] },
  { "type": "function", "name": "balanceOf", "stateMutability": "view", "inputs": [{"type":"address"}], "outputs": [{"type":"uint256"}] },
  { "type": "function", "name": "decimals",  "stateMutability": "view", "inputs": [], "outputs": [{"type":"uint8"}] }
] as const;

function toWei(amountTokens: number, decimals = 18) {
  return BigInt(Math.floor(amountTokens * 10 ** Math.min(decimals, 18)));
}

// --- Allowance helper ---
export function useTokenAllowance(token: Address, owner?: Address, spender?: Address) {
  const { address } = useAccount();
  const [allowance, setAllowance] = useState<bigint | null>(null);
  const who = owner ?? (address as Address | undefined);

  useEffect(() => {
    if (!token || !who || !spender) { setAllowance(null); return; }
    const client = createPublicClient({ chain: bsc, transport: http() });
    (async () => {
      try {
        const a = await client.readContract({ address: token, abi: ERC20_ABI, functionName: "allowance", args: [who, spender] });
        setAllowance(a as bigint);
      } catch (e) { console.error("allowance read failed", e); }
    })();
  }, [token, who, spender]);

  return allowance; // bigint or null
}

// --- Approve actions ---
export function useApprove(token: Address, spender: Address) {
  const { data: walletClient } = useWalletClient();
  const publicClient = createPublicClient({ chain: bsc, transport: http() });

  async function approveExact(amountWei: bigint) {
    if (!walletClient) throw new Error("Connect wallet first");
    const { request } = await publicClient.simulateContract({ account: walletClient.account!, address: token, abi: ERC20_ABI, functionName: "approve", args: [spender, amountWei] });
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }

  async function approveMax() {
    // Approve max uint256
    return approveExact(2n ** 256n - 1n);
  }

  return { approveExact, approveMax };
}

// --- Stake actions ---
export function useStakeActions(stakingAddress: Address, tokenAddress: Address) {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const publicClient = createPublicClient({ chain: bsc, transport: http() });
  const allowance = useTokenAllowance(tokenAddress, address as Address, stakingAddress);
  const { approveExact } = useApprove(tokenAddress, stakingAddress);

  async function estimateStakeGas(amountTokens: number, sponsor?: Address) {
    if (!walletClient) throw new Error("Connect wallet first");
    const amountWei = toWei(amountTokens);
    const { request } = await publicClient.simulateContract({
      address: stakingAddress,
      abi: STAKING_ABI,
      // @ts-ignore
      functionName: "stake",
      args: [amountWei, sponsor ?? ("0x0000000000000000000000000000000000000000" as Address)],
      account: walletClient.account!,
    });
    return request.gas as bigint | undefined;
  }

  async function stake(amountTokens: number, sponsor?: Address) {
    if (!walletClient) throw new Error("Connect wallet first");
    if (!address) throw new Error("Connect wallet first");
    const amountWei = toWei(amountTokens);

    // ensure allowance
    if (!allowance || allowance < amountWei) {
      await approveExact(amountWei);
    }

    // simulate then write
    const { request } = await publicClient.simulateContract({
      address: stakingAddress,
      abi: STAKING_ABI,
      // @ts-ignore
      functionName: "stake",
      args: [amountWei, sponsor ?? ("0x0000000000000000000000000000000000000000" as Address)],
      account: walletClient.account!,
    });
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }

  return { stake, estimateStakeGas, allowance };
}

// --- Unstake actions ---
export function useUnstakeActions(stakingAddress: Address) {
  const { data: walletClient } = useWalletClient();
  const publicClient = createPublicClient({ chain: bsc, transport: http() });

  async function estimateUnstakeGas(amountTokens?: number) {
    if (!walletClient) throw new Error("Connect wallet first");
    try {
      if (typeof amountTokens === "number") {
        const amountWei = toWei(amountTokens);
        const { request } = await publicClient.simulateContract({ address: stakingAddress, abi: STAKING_ABI, functionName: "unstake", args: [amountWei], account: walletClient.account! });
        return request.gas as bigint | undefined;
      } else {
        const { request } = await publicClient.simulateContract({ address: stakingAddress, abi: STAKING_ABI, functionName: "unstake", account: walletClient.account! });
        return request.gas as bigint | undefined;
      }
    } catch (e) {
      console.warn("gas estimate failed – check function signature", e);
      return undefined;
    }
  }

  async function unstakeAmount(amountTokens: number) {
    if (!walletClient) throw new Error("Connect wallet first");
    const amountWei = toWei(amountTokens);
    const { request } = await publicClient.simulateContract({ address: stakingAddress, abi: STAKING_ABI, functionName: "unstake", args: [amountWei], account: walletClient.account! });
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }

  async function unstakeAll() {
    if (!walletClient) throw new Error("Connect wallet first");
    const { request } = await publicClient.simulateContract({ address: stakingAddress, abi: STAKING_ABI, functionName: "unstake", account: walletClient.account! });
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }

  return { estimateUnstakeGas, unstakeAmount, unstakeAll };
}

// --- UI: Stake Panel ---
export function StakePanel({ stakingAddress, tokenAddress }: { stakingAddress: Address; tokenAddress: Address }) {
  const { address } = useAccount();
  const { stake, estimateStakeGas, allowance } = useStakeActions(stakingAddress, tokenAddress);
  const [amt, setAmt] = useState<string>("");
  const [sponsor, setSponsor] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [gas, setGas] = useState<bigint | undefined>(undefined);
  const [status, setStatus] = useState<string>("");

  async function previewGas() {
    try {
      const n = Number(amt);
      if (!n || n <= 0) return setStatus("Enter a valid amount");
      setStatus("Estimating gas…");
      const g = await estimateStakeGas(n, sponsor as Address);
      setGas(g);
      setStatus(g ? `Estimated gas: ${g.toString()}` : "");
    } catch (e:any) { setStatus(`❌ ${e?.shortMessage || e?.message || "Estimate failed"}`); }
  }

  async function doStake() {
    try {
      const n = Number(amt);
      if (!n || n <= 0) return setStatus("Enter a valid amount");
      setBusy(true); setStatus("Sending stake tx…");
      const rcpt = await stake(n, sponsor as Address);
      setStatus(`✅ Staked ${n} EGLIFE. Tx: ${String(rcpt.transactionHash).slice(0,10)}…`);
    } catch (e:any) {
      setStatus(`❌ ${e?.shortMessage || e?.message || "Stake failed"}`);
    } finally { setBusy(false); }
  }

  const allowanceOk = (() => {
    const n = Number(amt);
    if (!allowance || !n) return false;
    return allowance >= toWei(n);
  })();

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <Label>Stake</Label>
        <span className="text-xs text-slate-500">{address ? `Connected: ${address.slice(0,6)}…${address.slice(-4)}` : "Connect wallet"}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Amount (EGLIFE)</Label>
          <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="e.g., 1000" className="mt-2 w-full rounded-xl border px-3 py-2 outline-none" />
          <div className="mt-2 text-xs text-slate-500">Allowance: {allowance ? (Number(allowance) / 1e18).toLocaleString() : "—"}</div>
          <button onClick={previewGas} disabled={busy} className="mt-2 w-full rounded-xl bg-slate-900 px-3 py-2 text-white hover:bg-slate-800 disabled:opacity-50">Preview Gas</button>
        </div>

        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Sponsor (optional)</Label>
          <input type="text" value={sponsor} onChange={(e) => setSponsor(e.target.value)} placeholder="0x… or empty for default" className="mt-2 w-full rounded-xl border px-3 py-2 font-mono text-xs outline-none" />
          <div className="mt-2 text-xs text-slate-500">Leave blank for default sponsor assignment</div>
        </div>

        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Action</Label>
          <button onClick={doStake} disabled={busy} className="mt-2 w-full rounded-xl bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700 disabled:opacity-50">Stake</button>
          {gas && <div className="mt-2 text-xs text-slate-600">Est. Gas: {gas.toString()}</div>}
        </div>
      </div>

      {status && <div className="mt-3 text-sm text-slate-700">{status}</div>}
    </div>
  );
}

// --- UI: Unstake Panel ---
export function UnstakePanel({ stakingAddress }: { stakingAddress: Address }) {
  const { estimateUnstakeGas, unstakeAmount, unstakeAll } = useUnstakeActions(stakingAddress);
  const [amt, setAmt] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [gas, setGas] = useState<bigint | undefined>(undefined);
  const [status, setStatus] = useState<string>("");

  async function previewGas(partial: boolean) {
    try {
      setStatus("Estimating gas…");
      const g = partial ? await estimateUnstakeGas(Number(amt) || 0) : await estimateUnstakeGas();
      setGas(g);
      setStatus(g ? `Estimated gas: ${g.toString()}` : "");
    } catch (e:any) { setStatus(`❌ ${e?.shortMessage || e?.message || "Estimate failed"}`); }
  }

  async function doUnstakeAmount() {
    try {
      const n = Number(amt);
      if (!n || n <= 0) return setStatus("Enter a valid amount");
      setBusy(true); setStatus("Sending unstake tx…");
      const rcpt = await unstakeAmount(n);
      setStatus(`✅ Unstaked ${n} EGLIFE. Tx: ${String(rcpt.transactionHash).slice(0,10)}…`);
    } catch (e:any) {
      setStatus(`❌ ${e?.shortMessage || e?.message || "Unstake failed"}`);
    } finally { setBusy(false); }
  }

  async function doUnstakeAll() {
    try {
      setBusy(true); setStatus("Sending unstake tx…");
      const rcpt = await unstakeAll();
      setStatus(`✅ Unstaked all. Tx: ${String(rcpt.transactionHash).slice(0,10)}…`);
    } catch (e:any) {
      setStatus(`❌ ${e?.shortMessage || e?.message || "Unstake failed"}`);
    } finally { setBusy(false); }
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <Label>Unstake</Label>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Amount (EGLIFE)</Label>
          <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="e.g., 500" className="mt-2 w-full rounded-xl border px-3 py-2 outline-none" />
          <div className="mt-2 flex gap-2">
            <button onClick={() => previewGas(true)} className="rounded-xl bg-slate-900 px-3 py-2 text-white hover:bg-slate-800">Preview Gas</button>
            <button onClick={doUnstakeAmount} disabled={busy} className="rounded-xl bg-amber-600 px-3 py-2 text-white hover:bg-amber-700 disabled:opacity-50">Unstake Amount</button>
          </div>
        </div>
        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Unstake All</Label>
          <button onClick={() => previewGas(false)} className="mt-2 w-full rounded-xl bg-slate-900 px-3 py-2 text-white hover:bg-slate-800">Preview Gas</button>
          <button onClick={doUnstakeAll} disabled={busy} className="mt-2 w-full rounded-xl bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-50">Unstake All</button>
        </div>
        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Status</Label>
          <div className="mt-2 text-sm text-slate-700 min-h-10">{status}</div>
          {gas && <div className="mt-2 text-xs text-slate-600">Est. Gas: {gas.toString()}</div>}
        </div>
      </div>
    </div>
  );
}

// --- Example usage in a page/component ---

export default function Page() {
  const data = useMergedDashboard({
    stakingAddress: "0x90B374f87726F172504501c0B91eeEbadB5FE230" as Address,
    exampleStakeAmount: 300_000n * 10n ** 18n,
    exampleUser: "0x8B6e17a657c74beccBD36D712450a02b07DE1B1b" as Address, // Corrected address
    docId: "eglifestaking",
  });
  if (!data) return <div className="p-6">Loading…</div>;
  return (
    <>
        {data ? <EGLifeStakingDashboard data={data} /> : <div className="p-6">Loading…</div>}
        <div className="mx-auto max-w-6xl p-6">
            <ClaimPanel stakingAddress={"0x90B374f87726F172504501c0B91eeEbadB5FE230" as Address} />
        </div>
        <div className="mx-auto max-w-6xl p-6">
          <StakePanel stakingAddress={"0x90B374f87726F172504501c0B91eeEbadB5FE230" as Address} tokenAddress={"0xca326a5e15b9451efC1A6BddaD6fB098a4D09113" as Address} />
          <div className="mt-4" />
          <UnstakePanel stakingAddress={"0x90B374f87726F172504501c0B91eeEbadB5FE230" as Address} />
        </div>
    </>
  );
}


export function useSelfOnchain(stakingAddress: Address) {
  const { address } = useAccount();
  const [state, setState] = useState<{ earned?: number; staked?: number } | null>(null);

  useEffect(() => {
    if (!address) { setState(null); return; }
    const client = createPublicClient({ chain: bsc, transport: http() });
    const contract = { address: stakingAddress as `0x${string}`, abi: STAKING_ABI } as const;
    (async () => {
      try {
        const [earnedWei, stakedWei] = await client.multicall({
          contracts: [
            // @ts-ignore
            { ...contract, functionName: "earned", args: [address] },
            // @ts-ignore
            { ...contract, functionName: "stakedOf", args: [address] },
          ],
        });
        const toToken = (wei: bigint) => Number(wei) / 1e18;
        setState({ earned: toToken(earnedWei.result as bigint), staked: toToken(stakedWei.result as bigint) });
      } catch (e) {
        console.error("self reads failed", e);
      }
    })();
  }, [address, stakingAddress]);

  return { address, ...state };
}

export function useClaimActions(stakingAddress: Address) {
  const { data: walletClient } = useWalletClient();
  const publicClient = createPublicClient({ chain: bsc, transport: http() });

  async function claimAll() {
    if (!walletClient) throw new Error("Connect wallet first");
    const { request } = await publicClient.simulateContract({
        address: stakingAddress,
        abi: STAKING_ABI,
        // @ts-ignore
        functionName: "claim",
        args: [],
        account: walletClient.account!
    })
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }

  async function claimAmount(tokens: number) {
    if (!walletClient) throw new Error("Connect wallet first");
    const amountWei = BigInt(Math.floor(tokens * 1e18));
     const { request } = await publicClient.simulateContract({
      address: stakingAddress,
      abi: STAKING_ABI,
      // @ts-ignore
      functionName: "claim", 
      args: [amountWei],
      account: walletClient.account!
    });
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }

  return { claimAll, claimAmount };
}

export function ClaimPanel({ stakingAddress }: { stakingAddress: Address }) {
  const self = useSelfOnchain(stakingAddress);
  const { claimAll } = useClaimActions(stakingAddress);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");

  if (!self.address) {
    return (
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <Label>Claims</Label>
        <div className="mt-2 text-sm">Connect your wallet to view and claim rewards.</div>
      </div>
    );
  }

  async function doClaimAll() {
    try {
      setBusy(true); setStatus("Sending transaction…");
      const rcpt = await claimAll();
      setStatus(`✅ Claimed all. Tx: ${String(rcpt.transactionHash).slice(0,10)}…`);
    } catch (e:any) {
      setStatus(`❌ ${e?.shortMessage || e?.message || "Claim failed"}`);
    } finally { setBusy(false); }
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <Label>Claims</Label>
        <span className="text-xs text-slate-500">Connected: {`${self.address.slice(0,6)}…${self.address.slice(-4)}`}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Stat label="Staked" value={<>{(self.staked ?? 0).toLocaleString()} <span className="text-base">EGLIFE</span></>} />
        <Stat label="Earned" value={<>{(self.earned ?? 0).toLocaleString()} <span className="text-base">EGLIFE</span></>} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={doClaimAll} disabled={busy} className="rounded-xl bg-black px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50">Claim All</button>
        {status && <div className="text-sm text-slate-600">{status}</div>}
      </div>
    </div>
  );
}

