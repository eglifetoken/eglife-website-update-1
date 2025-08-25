
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
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="hsl(var(--primary))"/>
            <path d="M14.48 24.8H12V15.2H20.16C21.6267 15.2 22.84 15.68 23.8 16.64C24.76 17.5867 25.24 18.7467 25.24 20.12C25.24 21.4933 24.76 22.6533 23.8 23.6C22.84 24.5333 21.6267 25 20.16 25H16.8V29H14.48V24.8ZM16.8 22.8H20.16C20.8 22.8 21.32 22.6133 21.72 22.24C22.12 21.8533 22.32 21.0933 22.32 20.12C22.32 19.1467 22.12 18.3867 21.72 18C21.32 17.6 20.8 17.4 20.16 17.4H16.8V22.8Z" fill="hsl(var(--primary-foreground))"/>
        </svg>
        <span className="font-headline tracking-tighter">EGLIFE</span>
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
        <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </nav>

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


        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
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
