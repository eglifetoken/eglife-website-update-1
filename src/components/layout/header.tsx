
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/staking", label: "Staking" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/recommendations", label: "For You" },
  { href: "/dapp", label: "DApp" },
  { href: "/contact", label: "Contact" },
];

const Logo = () => (
    <svg width="140" height="40" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="object-contain">
        <g clipPath="url(#clip0_1_2)">
            <path d="M90 50C114.853 50 135 27.6142 135 0H45C45 27.6142 65.1472 50 90 50Z" fill="url(#paint0_linear_1_2)" className="text-primary-foreground dark:text-primary"/>
            <path d="M90 50C65.1472 50 45 27.6142 45 0H135C135 27.6142 114.853 50 90 50Z" fill="url(#paint1_radial_1_2)" fillOpacity="0.7"/>
            <text fill="hsl(var(--primary))" className="dark:fill-primary-foreground" fontFamily="Alegreya, serif" fontSize="24" fontWeight="bold" letterSpacing="0.05em" x="50%" y="55%" dominantBaseline="middle" textAnchor="middle">EGLIFE</text>
            <path d="M60 15C65 5 80 5 90 15L95 20C85 10 70 10 60 15Z" fill="hsl(var(--primary))" className="dark:fill-primary-foreground" opacity="0.8"/>
             <path d="M120 35C115 45 100 45 90 35L85 30C95 40 110 40 120 35Z" fill="hsl(var(--primary))" className="dark:fill-primary-foreground" opacity="0.8"/>
        </g>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="90" y1="0" x2="90" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="currentColor" stopOpacity="0.2"/>
                <stop offset="1" stopColor="currentColor" stopOpacity="0.8"/>
            </linearGradient>
            <radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(90 0) rotate(90) scale(50 100)">
                <stop stopColor="white" stopOpacity="0.2"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            <clipPath id="clip0_1_2">
                <rect width="180" height="50" rx="8"/>
            </clipPath>
        </defs>
    </svg>
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
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
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
                <Link href="/" className="flex items-center gap-3 mb-4">
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
