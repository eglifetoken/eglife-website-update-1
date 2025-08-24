
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, UserPlus } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    <div className="flex items-center gap-2">
       <Image src="/logo.png" alt="EGLIFE Logo" width={14} height={14} />
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
