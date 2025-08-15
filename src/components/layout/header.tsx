
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/staking", label: "Staking" },
  { href: "/recommendations", label: "For You" },
  { href: "/dapp", label: "DApp" },
  { href: "/contact", label: "Contact" },
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
                <linearGradient id="logoGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#logoGradientHeader)" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="32" fontWeight="bold" fontFamily="Alegreya">
                E
            </text>
        </svg>
    </div>
);


export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "text-lg font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-foreground/80"
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Register</Link>
            </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="mb-4">
                  <Logo />
                </Link>
                {navLinks.map(link => (
                  <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                ))}
                <div className="flex flex-col gap-4 pt-4 border-t">
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/register">Register</Link>
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
