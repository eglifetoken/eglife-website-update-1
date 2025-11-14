
"use client";

import React, { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { createPublicClient, http, formatEther, Address, zeroAddress } from "viem";
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

  // example user block (optional – for live card)
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
  const days = data.lockPeriodSeconds ? Math.round(data.lockPeriodSeconds / 86400) : 0;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">EGLIFE Staking – Contract Dashboard</h1>
        <p className="text-slate-600">Live, dynamic values suitable for admin or public display.</p>
      </header>

      {/* Top stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat label="Total Staked" value={<>{(data.totalStaked || 0).toLocaleString()} <span className="text-base font-normal">EGLIFE</span></>} />
        <Stat label="Base APR (example)" value={data.aprBpsForExampleStake ? bpsToPct(data.aprBpsForExampleStake) : "N/A"} hint={data.exampleStakeAmount ? `Applies at ${data.exampleStakeAmount.toLocaleString()} EGLIFE` : ""} />
        <Stat label="Lock Period" value={data.lockPeriodSeconds ? `${days} days` : "N/A"} hint={data.lockPeriodSeconds ? secondsToDhms(data.lockPeriodSeconds): ""} />
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
          <Row k="Early Unstake Penalty" v={data.earlyUnstakePenaltyBps ? bpsToPct(data.earlyUnstakePenaltyBps): "N/A"} />
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-3">
            <Label>Wallets</Label>
          </div>
          <Row k="Default Sponsor" v={data.defaultSponsor ? <AddressBadge addr={data.defaultSponsor} /> : "N/A"} />
          <Row k="Referral Wallet" v={data.referralWallet ? <AddressBadge addr={data.referralWallet} /> : "N/A"} />
          <Row k="Rewards Wallet" v={data.rewardsWallet ? <AddressBadge addr={data.rewardsWallet} /> : "N/A"} />
          <Row k="Treasury" v={data.treasury ? <AddressBadge addr={data.treasury} /> : "N/A"} />
        </div>
      </div>

      {/* Referral & Bonus */}
      <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-3">
          <Label>Referral & Bonuses</Label>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Stat label="Min Stake for Referral" value={<>{(data.minActiveStakeForReferral || 0).toLocaleString()} <span className="text-base font-normal">EGLIFE</span></>} />
          <Stat label="Purchase Sponsor Bonus" value={<>{data.purchaseSponsorBonusAmount || 0} <span className="text-base font-normal">EGLIFE</span></>} />
          <Stat label="Staking Sponsor Bonus" value={<>{data.stakingSponsorBonusAmount || 0} <span className="text-base font-normal">EGLIFE</span></>} />
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
const STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_defaultAdmin","type":"address"},{"internalType":"address","name":"_rewardsWallet","type":"address"},{"internalType":"address","name":"_referralWallet","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessControlBadConfirmation","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"neededRole","type":"bytes32"}],"name":"AccessControlUnauthorizedAccount","type":"error"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"currentAllowance","type":"uint256"},{"internalType":"uint256","name":"requestedDecrease","type":"uint256"}],"name":"SafeERC20FailedDecreaseAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"newLevel","type":"uint8"}],"name":"LevelUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referee","type":"address"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"reason","type":"string"}],"name":"SponsorBonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"oldSponsor","type":"address"},{"indexed":true,"internalType":"address","name":"newSponsor","type":"address"}],"name":"SponsorUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sponsor","type":"address"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"downline","type":"address"},{"indexed":true,"internalType":"address","name":"upline","type":"address"},{"indexed":false,"internalType":"uint8","name":"depth","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"uplineLevel","type":"uint8"}],"name":"TeamIncomePaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"level","type":"uint16","name":"aBps","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"bBps","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"cBps","type":"uint16"}],"name":"TeamPercentSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardsWallet","type":"address"},{"indexed":false,"internalType":"address","name":"referralWallet","type":"address"},{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"WalletsUpdated","type":"event"},{"inputs":[],"name":"ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"newSponsor","type":"address"}],"name":"adminReassignSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"adminRecomputeLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"activated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"defaultSponsor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"directCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"earlyUnstakePenaltyBps","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"a","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"firstStakeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"uint256","name":"limit","type":"uint256"}],"name":"getDirects","outputs":[{"internalType":"address[]","name":"out","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"root","type":"address"}],"name":"getLevelCounts","outputs":[{"internalType":"uint256[3]","name":"depthCounts","type":"uint256[3]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"root","type":"address"},{"internalType":"uint8","name":"depth","type":"uint8"},{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"uint256","name":"limit","type":"uint256"}],"name":"getTeamAtDepth","outputs":[{"internalType":"address[]","name":"out","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initDefaultLevelRules","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initDefaultTeamPercents","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initDefaultTiers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastAccrual","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"levelRules","outputs":[{"internalType":"uint256","name":"selfMin","type":"uint256"},{"internalType":"uint256","name":"selfMax","type":"uint256"},{"internalType":"uint16","name":"minA","type":"uint16"},{"internalType":"uint16","name":"minBC","type":"uint16"},{"internalType":"uint16","name":"minTotal","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minActiveStakeForReferral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purchaseSponsorBonusAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referee","type":"address"}],"name":"recordPurchaseSponsorBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"recomputeMyLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"callerConfirmation","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SECONDS_PER_YEAR","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"s","type":"address"}],"name":"setDefaultSponsor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"level","type":"uint8"},{"components":[{"internalType":"uint256","name":"selfMin","type":"uint256"},{"internalType":"uint256","name":"selfMax","type":"uint256"},{"internalType":"uint16","name":"minA","type":"uint16"},{"internalType":"uint16","name":"minBC","type":"uint16"},{"internalType":"uint16","name":"minTotal","type":"uint16"}],"internalType":"struct EGLifeStakingV3.LevelRule","name":"r","type":"tuple"}],"name":"setLevelRule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lockPeriod","type":"uint256"},{"internalType":"uint16","name":"_penaltyBps","type":"uint16"}],"name":"setLockAndPenalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"setMinActiveStakeForReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"setPurchaseSponsorBonusAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"setStakingSponsorBonusAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"level","type":"uint8"},{"internalType":"uint16","name":"aBps","type":"uint16"},{"internalType":"uint16","name":"bBps","type":"uint16"},{"internalType":"uint16","name":"cBps","type":"uint16"}],"name":"setTeamPercentRow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"idx","type":"uint256"},{"internalType":"uint256","name":"minAmt","type":"uint256"},{"internalType":"uint256","name":"maxAmt","type":"uint256"},{"internalType":"uint16","name":"aprBps","type":"uint16"}],"name":"setTier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"on","type":"bool"}],"name":"setUseTieredAPR","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewards","type":"address"},{"internalType":"address","name":"_referral","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"name":"setWallets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"sponsorBonusStatus","outputs":[{"internalType":"bool","name":"purchasePaid","type":"bool"},{"internalType":"bool","name":"stakePaid","type":"bool"},{"internalType":"uint256","name":"purchaseAmt","type":"uint256"},{"internalType":"uint256","name":"stakeAmt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sponsorOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sponsor","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingSponsorBonusAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"teamPercentsBpsByLevel","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"tiers","outputs":[{"internalType":"uint256","name":"min","type":"uint256"},{"internalType":"uint256","name":"max","type":"uint256"},{"internalType":"uint16","name":"aprBps","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"useTieredAPR","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

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
        const toToken = (wei: bigint) => Number(formatEther(wei));

        // Core reads
        const multicallResult = await client.multicall({
          contracts: [
            { ...contract, functionName: "totalStaked" },
            { ...contract, functionName: "lockPeriod" },
            { ...contract, functionName: "earlyUnstakePenaltyBps" },
            { ...contract, functionName: "useTieredAPR" },
            { ...contract, functionName: "paused" },
            { ...contract, functionName: "defaultSponsor" },
            { ...contract, functionName: "rewardsWallet" },
            { ...contract, functionName: "treasury" },
            { ...contract, functionName: "minActiveStakeForReferral" },
            { ...contract, functionName: "purchaseSponsorBonusAmount" },
            { ...contract, functionName: "stakingSponsorBonusAmount" },
          ],
          allowFailure: false,
        });

        const [
          totalStakedWei,
          lockPeriod,
          earlyBps,
          tiered,
          paused,
          defaultSponsor,
          rewardsWallet,
          treasury,
          minActiveRefWei,
          purchaseBonusWei,
          stakingBonusWei,
        ] = multicallResult;
        
        // This function doesn't exist on V3, so we can't call it. We will use a static value or remove it.
        const aprBps = 25000; // Static example value
        const exampleAmtWei = opts.exampleStakeAmount ?? (300_000n * 10n ** 18n);

        const partial: Partial<DashboardData> = {
          totalStaked: toToken((totalStakedWei as bigint) ?? 0n),
          lockPeriodSeconds: Number(lockPeriod.result as bigint),
          earlyUnstakePenaltyBps: Number(earlyBps.result as number),
          useTieredAPR: Boolean(tiered.result),
          paused: Boolean(paused.result),
          defaultSponsor: defaultSponsor.result as Address,
          referralWallet: "0x0000000000000000000000000000000000000000",
          rewardsWallet: rewardsWallet.result as Address,
          treasury: treasury.result as Address,
          minActiveStakeForReferral: toToken(minActiveRefWei.result as bigint),
          purchaseSponsorBonusAmount: toToken(purchaseBonusWei.result as bigint),
          stakingSponsorBonusAmount: toToken(stakingBonusWei.result as bigint),
          aprBpsForExampleStake: Number(aprBps),
          exampleStakeAmount: Number(exampleAmtWei / 10n ** 18n),
        };

        // Optional example user
        if (opts.exampleUser) {
          const user = opts.exampleUser;
          const userResults = await client.multicall({
            contracts: [
              { ...contract, functionName: "stakedBalance", args: [user] },
              { ...contract, functionName: "earned", args: [user] },
              { ...contract, functionName: "directCount", args: [user] },
              { ...contract, functionName: "sponsorOf", args: [user] },
              { ...contract, functionName: "firstStakeTime", args: [user] },
              { ...contract, functionName: "lastAccrual", args: [user] },
            ],
            allowFailure: false
          });
          
          const [stakedWei, earnedWei, directs, sponsor, first, last] = userResults;

          partial.exampleUser = {
            address: user,
            activated: (stakedWei.result as bigint) > 0n,
            stakedBalance: toToken(stakedWei.result as bigint),
            directCount: Number(directs.result as bigint),
            firstStakeTime: Number(first.result as bigint),
            lastAccrual: Number(last.result as bigint),
            earned: toToken(earnedWei.result as bigint),
            sponsor: sponsor.result as Address,
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
  const fsData = useDashboardFromFirestore(opts?.docId);
  const ocData = useDashboardFromChain(opts);
  const [merged, setMerged] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Base object with sensible defaults
    const base: Partial<DashboardData> = {
      network: "BNB Smart Chain (Mainnet)",
      tokenAddress: "0xca326a5e15b9451efC1A6BddaD6fB098a4D09113",
      stakingContract: opts.stakingAddress,
      paused: true,
      totalStaked: 0,
    };
    
    // Prioritize on-chain data (ocData) over Firestore data (fsData)
     const combined = { ...base, ...fsData, ...ocData };
    
    setMerged(combined as DashboardData);
  }, [fsData, ocData, opts.stakingAddress]);

  return merged;
}

// --- ERC20 Helpers (allowance, approve) ---
const ERC20_ABI = [
  { "type": "function", "name": "allowance", "stateMutability": "view", "inputs": [{"type":"address"},{"type":"address"}], "outputs": [{"type":"uint256"}] },
  { "type": "function", "name": "approve",   "stateMutability": "nonpayable", "inputs": [{"type":"address"},{"type":"uint256"}], "outputs": [{"type":"bool"}] },
] as const;

function toWei(amountTokens: number, decimals = 18) {
  return BigInt(Math.floor(amountTokens * 10 ** Math.min(decimals, 18)));
}

// Hook to fetch earned/staked for the connected address using viem public client
export function useSelfOnchain(stakingAddress: Address) {
  const { address } = useAccount();
  const [state, setState] = useState<{ address?: Address; earned?: number; staked?: number } | null>(null);

  useEffect(() => {
    if (!address) { setState(null); return; }
    const client = createPublicClient({ chain: bsc, transport: http() });
    const contract = { address: stakingAddress as `0x${string}`, abi: STAKING_ABI } as const;
    (async () => {
      try {
        const results = await client.multicall({
          contracts: [
            { ...contract, functionName: "earned", args: [address] },
            { ...contract, functionName: "stakedBalance", args: [address] },
          ],
           allowFailure: false,
        });

        const [earnedWei, stakedWei] = results;
        const toToken = (wei: bigint) => Number(formatEther(wei));
        setState({ address, earned: toToken(earnedWei.result as bigint), staked: toToken(stakedWei.result as bigint) });
      } catch (e) {
        console.error("self reads failed", e);
      }
    })();
  }, [address, stakingAddress]);

  return state || { address };
}

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

  return allowance;
}

export function useApprove(token: Address, spender: Address) {
  const { data: walletClient } = useWalletClient();
  const publicClient = createPublicClient({ chain: bsc, transport: http() });

  async function approveExact(amountWei: bigint) {
    if (!walletClient) throw new Error("Connect wallet first");
    const { request } = await publicClient.simulateContract({ account: walletClient.account!, address: token, abi: ERC20_ABI, functionName: "approve", args: [spender, amountWei] });
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }

  return { approveExact };
}

// --- Stake/Unstake/Claim Hooks ---

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
      functionName: "stake",
      args: [amountWei, sponsor ?? zeroAddress],
      account: walletClient.account!,
    });
    return request.gas;
  }

  async function stake(amountTokens: number, sponsor?: Address) {
    if (!walletClient || !address) throw new Error("Connect wallet first");
    const amountWei = toWei(amountTokens);

    if (!allowance || allowance < amountWei) {
      await approveExact(amountWei);
    }

    const { request } = await publicClient.simulateContract({
      address: stakingAddress,
      abi: STAKING_ABI,
      functionName: "stake",
      args: [amountWei, sponsor ?? zeroAddress],
      account: walletClient.account!,
    });
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }

  return { stake, estimateStakeGas, allowance };
}

export function useUnstakeActions(stakingAddress: Address) {
  const { data: walletClient } = useWalletClient();
  const publicClient = createPublicClient({ chain: bsc, transport: http() });
  const { address } = useAccount();

   async function unstake(amountTokens: number) {
    if (!walletClient || !address) throw new Error("Connect wallet first");
    const amountWei = toWei(amountTokens);
     const { request } = await publicClient.simulateContract({ 
      address: stakingAddress, 
      abi: STAKING_ABI, 
      functionName: "unstake", 
      args: [amountWei], 
      account: walletClient.account! 
    });
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }
  
  return { unstake };
}

export function useClaimActions(stakingAddress: Address) {
  const { data: walletClient } = useWalletClient();
  const publicClient = createPublicClient({ chain: bsc, transport: http() });

  async function claim(amountTokens: number) {
    if (!walletClient) throw new Error("Connect wallet first");
    const amountWei = toWei(amountTokens);
     const { request } = await publicClient.simulateContract({
      address: stakingAddress,
      abi: STAKING_ABI,
      functionName: "claim", 
      args: [amountWei],
      account: walletClient.account!
    });
    const hash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash });
  }

  return { claim };
}

// --- UI Components ---

export function ClaimPanel({ stakingAddress }: { stakingAddress: Address }) {
  const self = useSelfOnchain(stakingAddress);
  const { claim } = useClaimActions(stakingAddress);
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

  async function doClaim() {
    if (!self.earned || self.earned <= 0) {
      setStatus("No rewards to claim.");
      return;
    }
    try {
      setBusy(true); setStatus("Sending transaction…");
      const rcpt = await claim(self.earned);
      setStatus(`✅ Claimed ${self.earned.toFixed(4)} EGLIFE. Tx: ${String(rcpt.transactionHash).slice(0,10)}…`);
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
        <button onClick={doClaim} disabled={busy || !self.earned || self.earned <= 0} className="rounded-xl bg-black px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50">Claim Rewards</button>
        {status && <div className="text-sm text-slate-600">{status}</div>}
      </div>
    </div>
  );
}

export function StakePanel({ stakingAddress, tokenAddress }: { stakingAddress: Address; tokenAddress: Address }) {
  const { address } = useAccount();
  const { stake, estimateStakeGas, allowance } = useStakeActions(stakingAddress, tokenAddress);
  const [amt, setAmt] = useState<string>("");
  const [sponsor, setSponsor] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");

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
  
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <Label>Stake</Label>
        <span className="text-xs text-slate-500">{address ? `Connected: ${address.slice(0,6)}…${address.slice(-4)}` : "Connect wallet"}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Amount (EGLIFE)</Label>
          <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="e.g., 1000" className="mt-2 w-full rounded-xl border px-3 py-2 outline-none" />
          <div className="mt-2 text-xs text-slate-500">Allowance: {allowance ? (Number(allowance) / 1e18).toLocaleString() : "—"}</div>
        </div>

        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Sponsor (optional)</Label>
          <input type="text" value={sponsor} onChange={(e) => setSponsor(e.target.value)} placeholder="0x… or empty for default" className="mt-2 w-full rounded-xl border px-3 py-2 font-mono text-xs outline-none" />
        </div>
      </div>
      <div className="mt-4">
         <button onClick={doStake} disabled={busy} className="mt-2 w-full rounded-xl bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700 disabled:opacity-50">Stake</button>
      </div>

      {status && <div className="mt-3 text-sm text-slate-700">{status}</div>}
    </div>
  );
}

export function UnstakePanel({ stakingAddress }: { stakingAddress: Address }) {
  const { unstake } = useUnstakeActions(stakingAddress);
  const [amt, setAmt] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");
  
  const self = useSelfOnchain(stakingAddress);


  async function doUnstakeAmount() {
    try {
      const n = Number(amt);
      if (!n || n <= 0) return setStatus("Enter a valid amount");
      setBusy(true); setStatus("Sending unstake tx…");
      const rcpt = await unstake(n);
      setStatus(`✅ Unstaked ${n} EGLIFE. Tx: ${String(rcpt.transactionHash).slice(0,10)}…`);
    } catch (e:any) {
      setStatus(`❌ ${e?.shortMessage || e?.message || "Unstake failed"}`);
    } finally { setBusy(false); }
  }

  async function doUnstakeAll() {
    const stakedAmount = self.staked ?? 0;
    if(stakedAmount <= 0) return setStatus("Nothing to unstake.");
    try {
      setBusy(true); setStatus("Sending unstake tx…");
      const rcpt = await unstake(stakedAmount);
      setStatus(`✅ Unstaked all. Tx: ${String(rcpt.transactionHash).slice(0,10)}…`);
    } catch (e:any) {
      setStatus(`❌ ${e?.shortMessage || e?.message || "Unstake failed"}`);
    } finally { setBusy(false); }
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <Label>Unstake</Label>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Amount (EGLIFE)</Label>
          <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="e.g., 500" className="mt-2 w-full rounded-xl border px-3 py-2 outline-none" />
          <button onClick={doUnstakeAmount} disabled={busy} className="mt-2 w-full rounded-xl bg-amber-600 px-3 py-2 text-white hover:bg-amber-700 disabled:opacity-50">Unstake Amount</button>
        </div>
        <div className="rounded-2xl border p-4 shadow-sm">
          <Label>Unstake All</Label>
           <button onClick={doUnstakeAll} disabled={busy} className="mt-2 w-full rounded-xl bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-50">Unstake All</button>
        </div>
      </div>
       {status && <div className="mt-3 text-sm text-slate-700 min-h-10">{status}</div>}
    </div>
  );
}


// --- Example usage in a page/component ---

export default function Page() {
  const data = useMergedDashboard({
    stakingAddress: "0x90B374f87726F172504501c0B91eeEbadB5FE230" as Address,
    exampleStakeAmount: 300_000n * 10n ** 18n,
    exampleUser: "0x8B6e17a657c74beccBD36D712450a02b07DE1B1b" as Address,
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
