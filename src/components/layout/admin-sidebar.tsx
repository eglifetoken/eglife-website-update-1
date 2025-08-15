
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, PiggyBank, Settings, LogOut, BarChart } from "lucide-react";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/staking", label: "Staking", icon: PiggyBank },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const Logo = () => (
    <div className="flex items-center gap-2">
         <svg
            width="32"
            height="32"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
            >
            <defs>
                <linearGradient id="logoGradientAdmin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#logoGradientAdmin)" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="32" fontWeight="bold" fontFamily="Alegreya">
                E
            </text>
        </svg>
        <span className="text-xl font-headline font-bold">Admin</span>
    </div>
);

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-background border-r p-4 hidden md:flex flex-col">
      <div className="p-4 mb-4">
        <Link href="/admin">
            <Logo />
        </Link>
      </div>
      <nav className="flex-grow space-y-2">
        {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-muted text-primary"
            )}
          >
            <Icon className="h-5 w-5" />
            {link.label}
          </Link>
        )})}
      </nav>
      <div className="mt-auto">
         <Button variant="ghost" className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            Logout
         </Button>
      </div>
    </aside>
  );
}
