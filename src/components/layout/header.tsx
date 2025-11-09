
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dapp", label: "DApp" },
  { href: "/staking", label: "Staking" },
  { href: "/services", label: "Services" },
  { href: "/referral", label: "Referral" },
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide header on specific pages
  const hiddenPaths = ["/dapp", "/register"];
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
        <Link href="/" className="font-headline text-xl font-bold text-white">
            EGLIFE TOKEN
        </Link>
        
        <div className="flex items-center lg:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white rounded-full">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/90 backdrop-blur-sm">
                <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
              <div className="flex flex-col gap-6 p-6 pt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                        "text-xl font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground/80"
                    )}
                    >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
            {/* Desktop nav can be added here if needed in the future */}
        </div>

      </div>
    </header>
  );
}

    