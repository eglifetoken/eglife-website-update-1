
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, UserPlus } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/staking", label: "Staking" },
  { href: "/dapp", label: "DApp" },
  { href: "/referral", label: "Referral" },
  { href: "/crypto-education", label: "Education" },
  { href: "/contact", label: "Contact Us" },
];

const Logo = () => (
    <div className="flex items-center gap-2 font-bold text-xl" aria-label="EGLIFE TOKEN">
        <svg width="124" height="40" viewBox="0 0 124 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="hsl(var(--primary))"/>
          <text x="8" y="28" fontFamily="Lexend, sans-serif" fontSize="20" fontWeight="bold" fill="hsl(var(--primary-foreground))">EG</text>
          <text x="50" y="28" fontFamily="Lexend, sans-serif" fontSize="24" fontWeight="bold" fill="hsl(var(--foreground))" className="tracking-tight">LIFE</text>
        </svg>
    </div>
);


export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-foreground/80"
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <div className="flex items-center">
            <Link href="/">
                <Logo />
            </Link>
        </div>

        {/* Desktop: Centered navigation */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </nav>

        {/* Desktop: Buttons on the right */}
        <div className="hidden md:flex items-center gap-2">
             <Button asChild variant="ghost">
                <Link href="/dapp">
                    <LogIn className="mr-2 h-5 w-5" />
                    Login
                </Link>
            </Button>
            <Button asChild>
                <Link href="/register">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Register
                </Link>
            </Button>
        </div>

        {/* Mobile: Hamburger menu on the right */}
        <div className="flex items-center md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <div className="mb-4">
                  <Link href="/">
                     <Logo />
                  </Link>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground/80"
                    )}
                    >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-4 pt-4 border-t">
                    <Button asChild>
                        <Link href="/register">
                        <UserPlus className="mr-2 h-5 w-5" />
                        Register
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/dapp">
                        <LogIn className="mr-2 h-5 w-5" />
                        Login
                        </Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
